import React, { useRef, useState } from "react";
import axios from "axios";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import Modal from "./Modal/Modal";
import "./result.css";

const API = "http://127.0.0.1:8000/api";

export default function Result(props) {
  const inputs = props.inputs;
  const inputCount = inputs.length;
  const outputs = props.outputs;
  const outputCount = outputs.length;

  const resultNameRef = useRef("result_name");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const hideResults = () => {
    props.setResultVisibility(false);
  };

  const createResult = async () => {
    var resultName = resultNameRef.current.value;
    let content = {
      title: "Saved!",
      text: (
        <span>
          <code>{resultName}</code> successfully saved.
        </span>
      ),
    };

    await axios
      .post(`${API}/results/create/`, {
        result_name: resultName,
        inputs: inputs,
        outputs: outputs,
      })
      .then(() => {
        setModalContent(content);
      })
      .catch((err) => {
        content.title = err.message;
        if (err.response.status === 400) {
          content.text = (
            <span>
              There's already a result with the name <code>{resultName}</code>.
              Result names must be unique.
            </span>
          );
          setModalContent(content);
        } else {
          content.text = "Something went wrong.";
          setModalContent(content);
        }
      });
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="result-container">
        {props.header ? (
          props.header
        ) : (
          <header className="result-header">
            <input
              type="text"
              className="result-header--input"
              id="result-name-input"
              placeholder="Result name goes here"
              ref={resultNameRef}
            />
            <button className="result-header--button" onClick={createResult}>
              Save
            </button>
          </header>
        )}
        <div className="result-container--inner">
          <div className="mb-6">
            <h2 className="result-title">In [{inputCount}]</h2>
            <div className="result-content">
              {inputs.map((input) => {
                return (
                  <div className="result-content--inner" key={input.name}>
                    <h3 className="result-content-name">{input.name}</h3>
                    <div className="result-content-value">{input.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="result-title">Out [{outputCount}]</h2>
            <div className="result-content">
              {outputs.map((input) => {
                return (
                  <div className="result-content--inner" key={input.name}>
                    <h3 className="result-content-name">{input.name}</h3>
                    <div className="result-content-value">{input.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <footer className="result-footer">
            <p>
              Check out the source code on{" "}
              <a
                href="https://www.github.com/DrShahinstein"
                className="result-footer--github"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </p>
            {props.footerElement ? (
              props.footerElement
            ) : (
              <span className="result-footer--back" onClick={hideResults}>
                <BsFillArrowRightSquareFill />
              </span>
            )}
          </footer>
        </div>
      </div>

      <Modal
        content={modalContent}
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}

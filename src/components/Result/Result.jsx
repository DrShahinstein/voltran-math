import React, { useRef, useState } from "react";
import axios from "axios";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import Modal from "../Modal/Modal";
import "./result.css";

const API = process.env.REACT_APP_API_URL;

export default function Result(props) {
  const advInputs = props.advInputs;
  const advOutputs = props.advOutputs;
  const stdInputs = props.stdInputs;
  const stdOutputs = props.stdOutputs;
  const advInputsCount = advInputs.length;
  const stdInputsCount = stdInputs.length;
  const advOutputsCount = advOutputs.length;
  const stdOutputsCount = advOutputs.length;
  // The below are used to declare what fields does an input or output structure have, allows easy mapping in JSX
  const inputFields = ["power", "hours", "lampsCount", "lampsUnitPrice"];
  const outputFields = ["energyConsumed", "cost"];

  const resultNameRef = useRef("result_name");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const hideResults = () => {
    props.setResultVisibility(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") createResult();
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
        advInputs,
        advOutputs,
        stdInputs,
        stdOutputs,
      })
      .then(() => {
        setModalContent(content);
      })
      .catch((err) => {
        content.title = err.message;
        if (err.response.status === 400) {
          content.text = (
            <span>
              A result with the name <code>{resultName}</code> is already
              available Names must be unique
            </span>
          );
          setModalContent(content);
        } else {
          content.text = "Something went wrong with the server";
          setModalContent(content);
        }
      });

    setIsModalVisible(true);
    resultNameRef.current.value = ""; // Reset <input>
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
              onKeyDown={handleKeyDown}
              ref={resultNameRef}
            />
            <button className="result-header--button" onClick={createResult}>
              Save
            </button>
          </header>
        )}
        <div className="result-container--inner !rounded-t-none">
          <section>
            <h1 className="result-section-title">Advanced Lights</h1>
            <div className="mb-6">
              <h2 className="result-title">In [{advInputsCount}]</h2>
              <div className="result-content">
                {advInputs.map((input, i) => {
                  return (
                    <div className="result-content--inner" key={i}>
                      <h3 className="result-content-key">{input.name}</h3>
                      <div className="result-content-value">
                        {input[inputFields[i]]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="result-title">Out [{advOutputsCount}]</h2>
              <div className="result-content">
                {advOutputs.map((output, i) => {
                  return (
                    <div className="result-content--inner" key={i}>
                      <h3 className="result-content-key">{output.name}</h3>
                      <div className="result-content-value">
                        {output[outputFields[i]]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <h1 className="result-section-title">Standart Lights</h1>
            <div className="mb-6">
              <h2 className="result-title">In [{stdInputsCount}]</h2>
              <div className="result-content">
                {stdInputs.map((input, i) => {
                  return (
                    <div className="result-content--inner" key={i}>
                      <h3 className="result-content-key">{input.name}</h3>
                      <div className="result-content-value">
                        {input[inputFields[i]]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="result-title">Out [{stdOutputsCount}]</h2>
              <div className="result-content">
                {stdOutputs.map((output, i) => {
                  return (
                    <div className="result-content--inner" key={i}>
                      <h3 className="result-content-key">{output.name}</h3>
                      <div className="result-content-value">
                        {output[outputFields[i]]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

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
        elementToFocus={resultNameRef.current}
      />
    </>
  );
}

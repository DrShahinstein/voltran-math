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

  const fieldTextConversions = {
    power: "Power (kWh)",
    time: "Time (h/24)",
    lamps: "Lamps (count)",
    lamps_unit_price: "Unit Price (₺)",
    energy_consumed: "Consumed Energy",
    cost: "Cost (₺)",
  };

  const resultTitleRef = useRef("result_title");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const hideResults = () => {
    props.setResultVisibility(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") createResult();
  };

  const createResult = async () => {
    var resultTitle = resultTitleRef.current.value;
    let content = {
      title: "Saved!",
      text: (
        <span>
          <code>{resultTitle}</code> successfully saved.
        </span>
      ),
    };

    await axios
      .post(`${API}/results/create/`, {
        result_title: resultTitle,
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
              A result with the title <code>{resultTitle}</code> is already
              available. <br />
              Titles must be unique.
            </span>
          );
          setModalContent(content);
        } else {
          content.text = "Something went wrong with the server";
          setModalContent(content);
        }
      });

    setIsModalVisible(true);
    resultTitleRef.current.value = ""; // Reset <input>
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
              ref={resultTitleRef}
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
                      <h3 className="result-content-key">
                        {fieldTextConversions[input.name]}
                      </h3>
                      <div className="result-content-value">{input.value}</div>
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
                      <h3 className="result-content-key">
                        {fieldTextConversions[output.name]}
                      </h3>
                      <div className="result-content-value">{output.value}</div>
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
                      <h3 className="result-content-key">
                        {fieldTextConversions[input.name]}
                      </h3>
                      <div className="result-content-value">{input.value}</div>
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
                      <h3 className="result-content-key">
                        {fieldTextConversions[output.name]}
                      </h3>
                      <div className="result-content-value">{output.value}</div>
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
        elementToFocus={resultTitleRef.current}
      />
    </>
  );
}

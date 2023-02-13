import React, { useRef } from "react";
import axios from "axios";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import "./result.css";

const API = "http://127.0.0.1:8000/api";

export default function Result(props) {
  const inputs = props.inputs;
  const inputCount = inputs.length;
  const outputs = props.outputs;
  const outputCount = outputs.length;
  const resultNameRef = useRef("result_name");

  const hideResults = () => {
    props.setResultVisibility(false);
  };

  const createResult = async () => {
    var resultName = resultNameRef.current.value;
    const response = await axios.post(`${API}/results/create/`, {
      result_name: resultName,
      inputs: inputs,
      outputs: outputs,
    });
    console.log(response.data);
  };

  return (
    <div className="result-container">
      <header className="result-header">
        <input
          type="text"
          className="result-header--input"
          placeholder="Result name goes here"
          ref={resultNameRef}
        />
        <button className="result-header--button" onClick={createResult}>
          Save
        </button>
      </header>
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
          <span className="result-footer--back" onClick={hideResults}>
            <BsFillArrowRightSquareFill />
          </span>
        </footer>
      </div>
    </div>
  );
}

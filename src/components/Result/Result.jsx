import React from "react";
import "./result.css";

export default function Result(props) {
  const inputs = props.inputs;
  const inputCount = inputs.length;
  const outputs = props.outputs;
  const outputCount = inputs.length;

  return (
    <div className="result-container">
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
        <footer className="text-sm text-gray-600 mt-4">
          <p>
            Check out the source code on{" "}
            <a
              href="https://www.github.com/DrShahinstein"
              className="text-indigo-600 font-medium"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

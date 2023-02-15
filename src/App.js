import React, { useRef, useState } from "react";
import Form from "./components/Form/Form";
import Title from "./components/Title/Title";
import Layout from "./components/Layout/Layout";
import Result from "./components/Result/Result";
import "./App.css";

export default function App() {
  const [resultVisibility, setResultVisibility] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const inputNames = ["xInput", "yInput", "zInput", "aInput"]; // Desired inputs
  const outputNames = ["xOutput", "yOutput", "zOutput", "aOutput"]; // Desired outputs
  const formulations = {
    xOutput: 0, // Desired formula goes here
    yOutput: 0, // Desired formula goes here
    zOutput: 0, // Desired formula goes here
    aOutput: 0, // Desired formula goes here
  };
  const refs = {
    xInput: useRef(null),
    yInput: useRef(null),
    zInput: useRef(null),
    aInput: useRef(null),
  };

  const showResults = () => {
    // TODO: Show results
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = inputNames.map((name) => {
      return { name: name, value: parseInt(refs[name].current.value) };
    });

    const outputs = outputNames.map((name) => {
      return { name: name, value: formulations[name] };
    });

    setInputs(inputs);
    setOutputs(outputs);
    setResultVisibility(true);
  };

  if (!resultVisibility)
    return (
      <Layout>
        <div className="max-w-md mx-auto p-10">
          <Title>Voltran MathLab</Title>
          <Title.Subtitle>Girdileri girin ve hesaplayın!</Title.Subtitle>
          <Form handler={handleSubmit}>
            <Form.Input ref={refs.xInput}>X Giriniz</Form.Input>
            <Form.Input ref={refs.yInput}>Y Giriniz</Form.Input>
            <Form.Input ref={refs.zInput}>Z Giriniz</Form.Input>
            <Form.Input ref={refs.aInput}>A Giriniz</Form.Input>
            <div className="form-buttons">
              <button
                type="button"
                className="btn-results"
                onClick={showResults}
              >
                Results
              </button>
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </Layout>
    );

  return (
    <Result
      inputs={inputs}
      outputs={outputs}
      setResultVisibility={setResultVisibility}
    />
  );
}

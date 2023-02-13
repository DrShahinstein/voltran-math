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
  const xRef = useRef(null);
  const yRef = useRef(null);
  const zRef = useRef(null);
  const aRef = useRef(null);

  const calculate = (e) => {
    e.preventDefault();

    const xInput = {
      name: "xInput",
      value: parseInt(xRef.current.value),
    };
    const yInput = {
      name: "yInput",
      value: parseInt(yRef.current.value),
    };
    const zInput = {
      name: "zInput",
      value: parseInt(zRef.current.value),
    };
    const aInput = {
      name: "aInput",
      value: parseInt(aRef.current.value),
    };

    const xOutput = {
      name: "xOutput",
      value: 0, // Calculation goes here
    };
    const yOutput = {
      name: "yOutput",
      value: 0, // Calculation goes here
    };
    const zOutput = {
      name: "zOutput",
      value: 0, // Calculation goes here
    };
    const aOutput = {
      name: "aOutput",
      value: 0, // Calculation goes here
    };

    setInputs([xInput, yInput, zInput, aInput]);
    setOutputs([xOutput, yOutput, zOutput, aOutput]);
    setResultVisibility(true);
  };

  if (!resultVisibility)
    return (
      <Layout>
        <div className="max-w-md mx-auto p-10">
          <Title>Voltran MathLab</Title>
          <Title.Subtitle>Girdileri girin ve hesaplayın!</Title.Subtitle>
          <Form handler={calculate}>
            <Form.Input ref={xRef}>X Giriniz</Form.Input>
            <Form.Input ref={yRef}>Y Giriniz</Form.Input>
            <Form.Input ref={zRef}>Z Giriniz</Form.Input>
            <Form.Input ref={aRef}>A Giriniz</Form.Input>
            <div className="text-center mt-10">
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

import React, { useRef, useState } from "react";
import Form from "./components/Form/Form";
import Title from "./components/Title/Title";
import Layout from "./components/Layout/Layout";
import Result from "./components/Result/Result";
import ResultsList from "./components/ResultsList/ResultsList";
import "./App.css";

export default function App() {
  const [resultVisibility, setResultVisibility] = useState(false);
  const [showResultsList, setShowResultsList] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const inputNames = ["power", "hours", "lamps", "lampsUnitPrice"];
  const outputNames = ["energy", "lampsCost"];
  const refs = {
    power: useRef(null),
    hours: useRef(null),
    lamps: useRef(null),
    lampsUnitPrice: useRef(null),
  };

  const readable = (name) => {
    // Used to split and lower a camelCase input name
    return name.replace(/([a-z](?=[A-Z]))/g, "$1 ").toLowerCase();
  };

  const showResults = () => {
    setShowResultsList(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formulations = {
      energy:
        refs.power.current.value *
        refs.hours.current.value *
        refs.lamps.current.value,
      lampsCost: refs.lampsUnitPrice.current.value * refs.lamps.current.value,
    };

    const inputs = inputNames.map((name) => {
      return {
        name: readable(name),
        value: parseFloat(refs[name].current.value),
      };
    });

    const outputs = outputNames.map((name) => {
      return { name: readable(name), value: formulations[name] };
    });

    setInputs(inputs);
    setOutputs(outputs);
    setResultVisibility(true);
  };

  if (resultVisibility)
    return (
      <Result
        inputs={inputs}
        outputs={outputs}
        setResultVisibility={setResultVisibility}
      />
    );

  if (showResultsList) {
    return <ResultsList setShowResultsList={setShowResultsList} />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto p-10">
        <Title>Voltran MathLab</Title>
        <Title.Subtitle>Girdileri yazın ve hesaplayın!</Title.Subtitle>
        <Form handler={handleSubmit}>
          <Form.Input ref={refs.power}>Güç</Form.Input>
          <Form.Input ref={refs.hours}>Zaman</Form.Input>
          <Form.Input ref={refs.lamps}>Lamba Sayısı</Form.Input>
          <Form.Input ref={refs.lampsUnitPrice}>Lamba Birim Fiyatı</Form.Input>
          <div className="form-buttons">
            <button type="button" className="btn-results" onClick={showResults}>
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
}

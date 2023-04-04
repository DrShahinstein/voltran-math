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
  const inputNames = ["power", "hours", "lamps"];
  const outputNames = ["energy"];
  const refs = {
    power: useRef(null),
    hours: useRef(null),
    lamps: useRef(null),
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
    };

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
        <Title.Subtitle>Girdileri girin ve hesaplayın!</Title.Subtitle>
        <Form handler={handleSubmit}>
          <Form.Input ref={refs.power}>Güç</Form.Input>
          <Form.Input ref={refs.hours}>Zaman</Form.Input>
          <Form.Input ref={refs.lamps}>Lamba Sayısı</Form.Input>
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

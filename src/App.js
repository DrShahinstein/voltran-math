import React, { useRef, useState } from "react";
import Form from "./components/Form/Form";
import Title from "./components/Title/Title";
import Layout from "./components/Layout/Layout";
import Result from "./components/Result/Result";
import ResultsList from "./components/ResultsList/ResultsList";
import "./App.css";

// An independent function utility out of the React flow to refactor and maintain how inputs and outputs are created
const process = (refs) => {
  const unpackedRefValues = {
    power: refs.power.current.value,
    hours: refs.hours.current.value,
    lampsCount: refs.lampsCount.current.value,
    lampsUnitPrice: refs.lampsUnitPrice.current.value,
  };

  const inputs = [
    { name: "Power (kWh)", power: unpackedRefValues.power },
    { name: "Time (h/24)", hours: unpackedRefValues.hours },
    { name: "Lamps (count)", lampsCount: unpackedRefValues.lampsCount },
    {
      name: "Unit Price (₺)",
      lampsUnitPrice: unpackedRefValues.lampsUnitPrice,
    },
  ];

  const outputs = [
    {
      name: "Consumed Energy",
      energyConsumed:
        unpackedRefValues.power *
        unpackedRefValues.hours *
        unpackedRefValues.lampsCount,
    },
    {
      name: "Cost",
      cost: unpackedRefValues.lampsUnitPrice * unpackedRefValues.lampsCount,
    },
  ];

  return { inputs, outputs };
};

export default function App() {
  const [resultVisibility, setResultVisibility] = useState(false);
  const [showResultsList, setShowResultsList] = useState(false);
  const [advInputs, setAdvInputs] = useState([]);
  const [stdInputs, setStdInputs] = useState([]);
  const [advOutputs, setAdvOutputs] = useState([]);
  const [stdOutputs, setStdOutputs] = useState([]);

  const refsAdv = {
    power: useRef(null),
    hours: useRef(null),
    lampsCount: useRef(null),
    lampsUnitPrice: useRef(null),
  };

  const refsStd = {
    power: useRef(null),
    hours: useRef(null),
    lampsCount: useRef(null),
    lampsUnitPrice: useRef(null),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const advData = process(refsAdv);
    const stdData = process(refsStd);

    setAdvInputs(advData.inputs);
    setAdvOutputs(advData.outputs);

    setStdInputs(stdData.inputs);
    setStdOutputs(stdData.outputs);

    setResultVisibility(true);
  };

  const showResults = () => {
    setShowResultsList(true);
  };

  if (resultVisibility)
    return (
      <Result
        advInputs={advInputs}
        stdInputs={stdInputs}
        advOutputs={advOutputs}
        stdOutputs={stdOutputs}
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
        <Title.Subtitle>Enter inputs and calculate!</Title.Subtitle>
        <Form handler={handleSubmit}>
          <section>
            <h1 className="text-lg">Advanced Lights</h1>
            <div>
              <Form.Input id="power--advanced" ref={refsAdv.power}>
                Power (kWh)
              </Form.Input>
              <Form.Input ref={refsAdv.hours}>Time (h/24)</Form.Input>
              <Form.Input ref={refsAdv.lampsCount}>Lamps (count)</Form.Input>
              <Form.Input ref={refsAdv.lampsUnitPrice}>
                Unit Price (for lamps)
              </Form.Input>
            </div>
          </section>

          <section>
            <h1 className="text-lg">Standart Lights</h1>
            <div>
              <Form.Input ref={refsStd.power}>Power (kWh)</Form.Input>
              <Form.Input ref={refsStd.hours}>Time (h/24)</Form.Input>
              <Form.Input ref={refsStd.lampsCount}>Lamps (count)</Form.Input>
              <Form.Input ref={refsStd.lampsUnitPrice}>
                Unit Price (for lamps)
              </Form.Input>
            </div>
          </section>

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

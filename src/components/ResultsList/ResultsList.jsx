import React, { Component, Fragment } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Result from "../Result/Result";
import Modal from "../Result/Modal/Modal";
import axios from "axios";
import "./resultslist.css";

const API = "http://127.0.0.1:8000/api";

export default class ResultsList extends Component {
  constructor(props) {
    super(props);

    this.modalContent = {
      title: "",
      text: "",
    };
  }

  state = {
    results: [],
    modalContent: {},
    isModalVisible: false,
  };

  deleteResult = async (resultToDelete) => {
    const resultName = resultToDelete;

    await axios
      .delete(`${API}/results/${resultName}/`)
      .then(() => {
        this.setState((prevState) => ({
          results: prevState.results.filter(
            (result) => result.result_name !== resultName
          ),
        }));
      })
      .catch((err) => {
        this.modalContent.title = err.message;
        if (err.response.status === 204 || err.response.status === 404) {
          this.modalContent.text = (
            <span>
              Any result with the name <code>{resultName}</code> was not found
            </span>
          );
        } else {
          this.modalContent.text = <span>Something went wrong.</span>;
        }
        this.setState({
          modalContent: this.modalContent,
          isModalVisible: true,
        });
      });
  };

  // Created to pass as props as it's not possible to use states in class comps
  setIsModalVisible = (visible) => {
    this.setState({ isModalVisible: visible });
  };

  componentDidMount() {
    axios
      .get(`${API}/results/`)
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((err) => {
        this.modalContent.title = err.message;
        this.modalContent.text = "Something went wrong.";
        this.setState({
          modalContent: this.modalContent,
          isModalVisible: true,
        });
      });
  }

  render() {
    return (
      <>
        <div className="result-list">
          <div className="result-list--outer">
            {this.state.results.map((result) => {
              const name = result.result_name;
              return (
                <Fragment key={name}>
                  <Result
                    inputs={result.inputs}
                    outputs={result.outputs}
                    footerElement={
                      <span
                        className="result-footer--delete"
                        onClick={() => this.deleteResult(name)}
                      >
                        <BsFillTrashFill />
                      </span>
                    }
                    header={
                      <header className="result-header">
                        <h1 className="result-header--name">{name}</h1>
                      </header>
                    }
                  />
                </Fragment>
              );
            })}
          </div>
        </div>

        <Modal
          content={this.state.modalContent}
          isVisible={this.state.isModalVisible}
          setIsModalVisible={this.setIsModalVisible}
        />
      </>
    );
  }
}

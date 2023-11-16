import React, { Component, Fragment } from "react";
import { BsFillTrashFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import Result from "../Result/Result";
import Modal from "../Modal/Modal";
import axios from "axios";
import Chart from "../Chart/Chart";
import Preloader from "../Preloader/Preloader";
import "./resultslist.css";

const API = process.env.REACT_APP_API_URL;

export default class ResultsList extends Component {
  constructor(props) {
    super(props);

    this.deleteResult = this.deleteResult.bind(this);
    this.setIsModalVisible = this.setIsModalVisible.bind(this);
    this.back = this.back.bind(this);

    this.state = {
      results: [],
      modalContent: { title: "", text: "" },
      isModalVisible: false,
      loading: true,
    };
  }

  deleteResult = async (resultTitle) => {
    /* 
     resultTitle indicates the result to be deleted as we
     use names of results like an ID to distinguish them so that we can choose which one to delete
    */

    await axios
      .delete(`${API}/results/${resultTitle}/`)
      .then(() => {
        this.setState((prevState) => ({
          results: prevState.results.filter(
            (result) => result.result_title !== resultTitle
          ),
        }));
      })
      .catch((err) => {
        const { modalContent } = this.state;

        this.setState({
          modalContent: {
            ...modalContent,
            title: err.message,
          },
        });

        switch (err.response.status) {
          case 204:
          case 404:
            this.setState({
              modalContent: {
                ...modalContent,
                text: (
                  <span>
                    Any result with the title <code>{resultTitle}</code> was not
                    found
                  </span>
                ),
              },
            });
            break;
          default:
            this.setState({
              modalContent: {
                ...modalContent,
                text: <span>Something went wrong with server</span>,
              },
            });
            break;
        }

        this.setState({
          isModalVisible: true,
        });
      });
  };

  // Created to pass as props as it's not possible to use states in class comps
  setIsModalVisible = (visible) => {
    this.setState({ isModalVisible: visible });
  };

  async componentDidMount() {
    await axios
      .get(`${API}/results/`)
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((err) => {
        this.setState({
          modalContent: {
            title: err.message,
            text: "Something went wrong with the server",
          },
          isModalVisible: true,
        });
      });
    this.setState({ loading: false });
  }

  back() {
    this.props.setShowResultsList(false);
  }

  render() {
    if (this.state.loading) return <Preloader />;
    return (
      <>
        <div className="result-list">
          <div className="result-list--inner">
            {this.state.results.length === 0 ? (
              <div className="empty-response">
                <h1 className="empty-res-msg">No results available</h1>
                <button className="empty-res-btn-back" onClick={this.back}>
                  Back
                </button>
              </div>
            ) : (
              <>
                <button className="btn-back" onClick={this.back}>
                  <BsFillArrowLeftSquareFill />
                </button>

                {this.state.results.map((result) => {
                  const title = result.result_title;
                  const consumedEnergyAdv = result.adv_outputs[0].value;
                  const consumedEnergyStd = result.std_outputs[0].value;

                  return (
                    <div className="result-view" key={title}>
                      <Result
                        advInputs={result.adv_inputs}
                        advOutputs={result.adv_outputs}
                        stdInputs={result.std_inputs}
                        stdOutputs={result.std_outputs}
                        footerElement={
                          <span
                            className="result-footer--delete"
                            onClick={() => this.deleteResult(title)}
                          >
                            <BsFillTrashFill />
                          </span>
                        }
                        header={
                          <header className="result-header">
                            <h1 className="result-header--name">{title}</h1>
                          </header>
                        }
                      />

                      <Chart
                        advancedUseOfEnergy={consumedEnergyAdv}
                        standartUseOfEnergy={consumedEnergyStd}
                      />
                    </div>
                  );
                })}
              </>
            )}
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

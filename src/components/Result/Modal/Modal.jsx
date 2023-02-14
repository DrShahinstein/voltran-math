import React from "react";
import { ImCancelCircle } from "react-icons/im";
import "./modal.css";

export default function Modal(props) {
  const visible = props.isVisible;
  const modalContent = props.content;

  const hideModal = () => {
    props.setIsModalVisible(false);
  };

  if (visible)
    return (
      <div className="modal-overlay">
        <div
          className="modal"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-dialog--inner">
              <div className="modal-header">
                <h5 className="modal-header--title" id="exampleModalLabel">
                  {modalContent.title}
                </h5>
                <button
                  type="button"
                  className="modal-header--close-btn"
                  onClick={hideModal}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <ImCancelCircle />
                </button>
              </div>
              <div className="modal-body">{modalContent.text}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-footer--close-btn"
                  onClick={hideModal}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="modal-footer--ok-btn"
                  onClick={hideModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return null;
}

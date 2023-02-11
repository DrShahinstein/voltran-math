import React from "react";
import "./button.css";

export default function Button(props) {
  if (props.small)
    return (
      <button type={props.type} className="btn-blue btn-small">
        {props.children}
      </button>
    );
  if (props.large)
    return (
      <button type={props.type} className="btn-blue btn-large">
        {props.children}
      </button>
    );
  return (
    <button type={props.type} className="btn-blue btn-medium">
      {props.children}
    </button>
  );
}

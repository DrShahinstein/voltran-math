import React, { forwardRef } from "react";
import "./form.css";

export default function Form(props) {
  return (
    <form className="form" onSubmit={props.handler}>
      {props.children}
    </form>
  );
}

const Input = forwardRef((props, ref) => {
  return (
    <label className="block mb-2">
      <input
        type="number"
        step="any"
        className="input"
        placeholder={props.children}
        ref={ref}
        required
      />
    </label>
  );
});

Form.Input = Input;

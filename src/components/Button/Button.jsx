import "./button.css";

export default function Button(props) {
  return (
    <button type={props.type} className="btn-blue">
      Submit
    </button>
  );
}

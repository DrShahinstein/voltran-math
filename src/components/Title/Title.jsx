import React from "react";
import "./title.css";

export default function Title({ children }) {
  return <h1 className="title">{children}</h1>;
}

const Subtitle = ({ children }) => {
  return <p className="subtitle">{children}</p>;
};

Title.Subtitle = Subtitle;

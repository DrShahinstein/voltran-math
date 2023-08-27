import React from "react";
import { SyncLoader } from "react-spinners";
import "./preloader.css";

export default function Preloader() {
  return (
    <div className="preloader">
      <SyncLoader size={20} />
    </div>
  );
}

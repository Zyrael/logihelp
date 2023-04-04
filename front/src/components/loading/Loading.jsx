import React from "react";
import "./Loading.css";
import { ReactComponent as LoadingSVG } from "../../assets/icons/loading.svg";

export function Loading() {
  return (
    <div className="loading">
      <LoadingSVG className="loading-icon" />
    </div>
  );
}

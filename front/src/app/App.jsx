import React from "react";
import { useSelector } from "react-redux";
import { Modal, PDF, Suppliers, Routes } from "../components";
import "./App.css";

export function App() {
  const modalMode = useSelector((state) => state.modal.mode);

  return (
    <div id="app" className="app">
      <div className="app-inner">
        <Suppliers />
        <Routes />
        {!(modalMode === "closed") && <Modal />}
        <PDF />
      </div>
    </div>
  );
}

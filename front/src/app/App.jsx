import React from "react";
import { useSelector } from "react-redux";
import { Modal, RouteList, Suppliers } from "../components";
import "./App.css";

export function App() {
  const modalMode = useSelector((state) => state.modal.mode);

  return (
    <div id="app" className="app">
      <div className="app-inner">
        <Suppliers />
        <RouteList />
        {!(modalMode === "closed") && <Modal />}
        {/* <PDF /> */}
      </div>
    </div>
  );
}

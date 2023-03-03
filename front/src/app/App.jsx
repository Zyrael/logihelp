import React from "react";
import { useSelector } from "react-redux";
import { Modal, RouteList, Suppliers } from "../components";
import "./App.css";

export function App() {
  const modalMode = useSelector((state) => state.modal.mode);

  return (
    <div id="app" className="app">
      <Suppliers />
      <RouteList />
      {!(modalMode === "closed") && <Modal />}
      {/* <PDF /> */}
    </div>
  );
}

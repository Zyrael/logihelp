import React from "react";
import { useSelector } from "react-redux";
import { Suppliers, RouteList, Modal } from "../components";
import "./App.css";

export function App() {
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  return (
    <div id="app" className="app">
      <Suppliers />
      <RouteList />
      {isModalOpen && <Modal />}
    </div>
  );
}

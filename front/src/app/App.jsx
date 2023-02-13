import React from "react";
import { useSelector } from "react-redux";
import { SupplierList, RouteList, Modal } from "../components";
import "./App.css";

export function App() {
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  return (
    <div id="app" className="app">
      <SupplierList />
      <RouteList />
      {isModalOpen && <Modal />}
    </div>
  );
}

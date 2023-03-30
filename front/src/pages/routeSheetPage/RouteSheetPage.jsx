import React from "react";
import { useSelector } from "react-redux";
import { Modal, SupplierList, RouteSheet } from "../../components";
import "./RouteSheetPage.css";

export function RouteSheetPage({ logout }) {
  const modalMode = useSelector((state) => state.modal.mode);

  return (
    <div id="app" className="app">
      <button type="button" className="logout" onClick={logout}>
        Logout
      </button>
      <div className="app-inner">
        <SupplierList />
        <RouteSheet />
        {!(modalMode === "closed") && <Modal />}
      </div>
    </div>
  );
}

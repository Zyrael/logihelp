import React from "react";
import { SupplierList, RouteSheet } from "../../components";
import "./RouteSheetPage.css";
import { SupplierTab } from "../../components/supplierTab";

export function RouteSheetPage({ logout }) {
  return (
    <div className="route-sheet-page">
      <div className="content-container content-container--left">
        <SupplierList />
        <SupplierTab />
      </div>
      <div className="content-container content-container--right">
        <RouteSheet />
      </div>
      <div className="logout-window">
        <div className="logout-button-container">
          <button type="button" className="logout" onClick={logout}>
            Выйти
          </button>
        </div>
        <div className="arrow-down" />
      </div>
    </div>
  );
}

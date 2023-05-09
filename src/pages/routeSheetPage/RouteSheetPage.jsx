import React from "react";
import { SupplierList, RouteSheet } from "../../components";
import "./RouteSheetPage.css";
import { SupplierTab } from "../../components/supplierTab";

export function RouteSheetPage() {
  return (
    <div className="route-sheet-page">
      <div className="content-container content-container--left">
        <SupplierList />
        <SupplierTab />
      </div>
      <div className="content-container content-container--right">
        <RouteSheet />
      </div>
      {/* {!(modalMode === "closed") && <Modal />} */}
    </div>
  );
}

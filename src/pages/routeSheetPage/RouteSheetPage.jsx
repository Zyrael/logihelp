import React from "react";
import {
  SupplierList,
  LeftContainer,
  RightContainer,
  RouteSheet,
} from "../../components";
import "./RouteSheetPage.css";
import { SupplierTab } from "../../components/supplierTab";

export function RouteSheetPage() {
  return (
    <div className="route-sheet-page">
      <LeftContainer>
        <SupplierList />
        <SupplierTab />
      </LeftContainer>
      <RightContainer>
        <RouteSheet />
      </RightContainer>
      {/* {!(modalMode === "closed") && <Modal />} */}
    </div>
  );
}

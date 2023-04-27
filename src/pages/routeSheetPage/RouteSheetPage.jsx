import React from "react";
import {
  SupplierList,
  LeftContainer,
  RightContainer,
  RouteSheet,
} from "../../components";
import "./RouteSheetPage.css";
import { SupplierInfo } from "../../components/supplierInfo";

export function RouteSheetPage() {
  return (
    <div className="route-sheet-page">
      <LeftContainer>
        <SupplierList />
        <SupplierInfo />
      </LeftContainer>
      <RightContainer>
        <RouteSheet />
      </RightContainer>
      {/* {!(modalMode === "closed") && <Modal />} */}
    </div>
  );
}

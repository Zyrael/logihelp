import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  SupplierList,
  LeftContainer,
  RightContainer,
  RouteSheet,
} from "../../components";
import "./RouteSheetPage.css";
import { SupplierInfo } from "../../components/supplierInfo";

export function RouteSheetPage() {
  const modalMode = useSelector((state) => state.modal.mode);

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

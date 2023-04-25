import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  SupplierList,
  RightContainer,
  RouteSheet,
} from "../../components";
import "./RouteSheetPage.css";

export function RouteSheetPage() {
  const modalMode = useSelector((state) => state.modal.mode);

  return (
    <div className="route-sheet-page">
      <SupplierList />
      <RightContainer>
        <RouteSheet />
      </RightContainer>
      {!(modalMode === "closed") && <Modal />}
    </div>
  );
}

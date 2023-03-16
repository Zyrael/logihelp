import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SupplierForm } from "../supplierForm";
import { setMode } from "./modalslice";
import "./Modal.css";
import { PDF } from "../pdf";
import { ReactComponent as Times } from "../../assets/icons/times.svg";

const noContent = {
  id: "",
  name: "",
  url: "",
  address: "",
  contacts: "",
  additionalData: "",
};

const mapContentType = {
  edit: () => (
    <SupplierForm content={useSelector((state) => state.modal.currSupplier)} />
  ),
  create: () => <SupplierForm content={noContent} />,
  print: () => <PDF />,
};

export function Modal() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.modal.mode);
  return (
    <div
      className={cn({
        "modal-backdrop": true,
      })}
    >
      <div className="modal-body">
        {mapContentType[mode]()}
        <button
          type="button"
          className="close-btn"
          onClick={() => dispatch(setMode({ mode: "closed" }))}
        >
          <Times className="close-btn-icon" />
        </button>
      </div>
    </div>
  );
}

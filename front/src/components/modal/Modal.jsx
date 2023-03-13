import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SupplierForm } from "../supplierForm";
import { setMode } from "./modalslice";
import "./Modal.css";
import { PDF } from "../pdf";

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
        <div className="modal-content">{mapContentType[mode]()}</div>
        <button
          type="button"
          className="close-btn"
          onClick={() => dispatch(setMode({ mode: "closed" }))}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

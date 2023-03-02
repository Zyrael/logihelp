import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { SupplierForm } from "../supplierForm";
import { setMode } from "./modalslice";
import "./Modal.css";

const mapContentType = {
  edit: () => useSelector((state) => state.modal.currSupplier),
  create: () => ({
    id: "",
    name: "",
    url: "",
    address: "",
    contacts: "",
    additionalData: "",
  }),
};

export function Modal() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.modal.mode);
  const content = mapContentType[mode]();
  return (
    <div
      className={cn({
        "modal-backdrop": true,
      })}
    >
      <div className="modal-body">
        <div className="modal-content">
          <SupplierForm content={content} />
        </div>
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

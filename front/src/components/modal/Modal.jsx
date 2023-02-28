import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { SupplierForm } from "../supplierForm";
import { SupplierInfo } from "../supplierInfo";
import { closeModal } from "./modalslice";
import "./Modal.css";

const mapContentType = {
  form: () => <SupplierForm />,
  info: () => <SupplierInfo />,
};

export function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const contentType = useSelector((state) => state.modal.content.type);
  const content = mapContentType[contentType];
  return (
    <div
      className={cn({
        "modal-backdrop": true,
        "is-open": isOpen,
      })}
    >
      <div className="modal-body">
        <div className="modal-content">{content()}</div>
        <button
          type="button"
          className="close-btn"
          onClick={() => dispatch(closeModal())}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

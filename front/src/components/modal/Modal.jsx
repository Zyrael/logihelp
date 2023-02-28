import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { SupplierForm } from "../supplierForm";
import { SupplierInfo } from "../supplierInfo";
import { closeModal } from "./modalslice";
import "./Modal.css";

const mapContent = {
  form: () => <SupplierForm />,
  info: () => <SupplierInfo />,
};

export function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const content = useSelector((state) => state.modal.content);
  const modalContent = mapContent[content];
  return (
    <div
      className={cn({
        "modal-backdrop": true,
        "is-open": isOpen,
      })}
    >
      <div className="modal-body">
        <div className="modal-content">{modalContent()}</div>
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

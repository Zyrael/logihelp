import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "./modalslice";
import "./Modal.css";

export function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const content = useSelector((state) => state.modal.content);
  return (
    <div
      className={cn({
        "modal-backdrop": true,
        "is-open": isOpen,
      })}
    >
      <div className="modal-body">
        <div className="modal-content">{content}</div>
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

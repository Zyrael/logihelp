import React from "react";
import cn from "classnames";
import "./Modal.css";

export function Modal({ isOpened, closeModal, children }) {
  return (
    <div
      className={cn({
        "modal-backdrop": true,
        "is-opened": isOpened,
      })}
    >
      <div className="modal-body">
        <div className="modal-content">{children}</div>
        <button type="button" className="close-btn" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
}

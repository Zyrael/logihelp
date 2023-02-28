import React from "react";
import { useDispatch } from "react-redux";
import { addRoute } from "../../../routeList/routeListSlice";
import { openModal, setContent } from "../../../modal/modalslice";
import Glass from "./glass.svg";
import "./SupplierItem.css";

export function SupplierItem({ supplier }) {
  const dispatch = useDispatch();
  const handleSeeButton = (e) => {
    e.stopPropagation();
    dispatch(setContent({ type: "info", supplier }));
    dispatch(openModal());
  };

  return (
    <li
      tabIndex={0}
      className="supplier-item"
      onClick={() => dispatch(addRoute(supplier))}
    >
      {supplier.name}
      <button
        type="button"
        className="open-supplier-btn"
        onClick={handleSeeButton}
      >
        <img src={Glass} alt="" width="12px" />
      </button>
    </li>
  );
}

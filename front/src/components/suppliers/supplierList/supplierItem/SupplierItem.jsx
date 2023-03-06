import React from "react";
import { useDispatch } from "react-redux";
import { addRoute } from "../../../routeList/routeListSlice";
import { ReactComponent as Pencil } from "./pencil.svg";
import { setMode } from "../../../modal/modalslice";
import "./SupplierItem.css";

export function SupplierItem({ supplier }) {
  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(setMode({ mode: "edit", supplier }));
  };

  return (
    <li
      tabIndex={0}
      className="supplier-item"
      onClick={() => dispatch(addRoute(supplier))}
    >
      {supplier.name}
      <button type="button" className="edit-btn" onClick={handleEditButton}>
        {/* <img src={Pencil} className="edit-icon" alt="Edit" width="15px" /> */}
        <Pencil className="edit-icon" />
      </button>
    </li>
  );
}

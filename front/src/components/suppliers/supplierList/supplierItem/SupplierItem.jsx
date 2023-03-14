import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addRoute } from "../../../routes/routeList/routeListSlice";
import { ReactComponent as Pencil } from "../../../../assets/icons/edit.svg";
import { setMode } from "../../../modal/modalslice";
import "./SupplierItem.css";

export function SupplierItem({ supplier }) {
  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(setMode({ mode: "edit", supplier }));
  };

  const [showButton, setShowButton] = useState(false);
  const editBtnClasses = cn("edit-btn", { visible: showButton });
  return (
    <li
      tabIndex={0}
      className="supplier-item"
      onClick={() => dispatch(addRoute(supplier))}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {supplier.name}
      <button
        type="button"
        className={editBtnClasses}
        onClick={handleEditButton}
      >
        <Pencil className="edit-icon" />
      </button>
    </li>
  );
}

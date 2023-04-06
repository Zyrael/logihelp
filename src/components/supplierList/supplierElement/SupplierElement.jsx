import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addRoute } from "../../routeSheet/routeList/routeListSlice";
import { ReactComponent as Pencil } from "../../../assets/icons/edit.svg";
import { setMode } from "../../modal/modalslice";
import "./SupplierElement.css";

export function SupplierElement({ supplier }) {
  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(setMode({ mode: "edit", supplier }));
  };

  const [showButton, setShowButton] = useState(false);
  const editBtnClasses = cn("edit-supplier-btn", { visible: showButton });
  return (
    <li
      tabIndex={0}
      className="supplier"
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

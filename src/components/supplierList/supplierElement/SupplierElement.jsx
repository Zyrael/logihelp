import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addRoute } from "../../routeSheet/routeSheetSlice";
import { openSupplierInfo } from "../../supplierInfo/supplierInfoSlice";
import { ReactComponent as GlassSVG } from "../../../assets/icons/info.svg";
import "./SupplierElement.css";

export function SupplierElement({ supplier }) {
  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(openSupplierInfo({ supplier }));
  };

  const [showButton, setShowButton] = useState(false);
  const showBtnClasses = cn("show-supplier-btn", { visible: showButton });
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
        className={showBtnClasses}
        onClick={handleEditButton}
      >
        <GlassSVG className="show-supplier-icon" />
      </button>
    </li>
  );
}

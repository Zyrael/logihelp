import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addRoute } from "../../routeSheet/routeSheetSlice";
import { openSupplierInfo } from "../../supplierTab/supplierInfoSlice";
import { ReactComponent as InfoSVG } from "../../../assets/iconpack/info-circle.svg";
import "./SupplierElement.css";

export function SupplierElement({ supplier }) {
  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(openSupplierInfo({ supplier }));
  };

  const handleSupplierClick = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      dispatch(openSupplierInfo({ supplier }));
      return;
    }
    dispatch(addRoute(supplier));
  };

  const [showButton, setShowButton] = useState(false);
  const showBtnClasses = cn("show-supplier-btn", { visible: showButton });
  return (
    <li
      tabIndex={0}
      className="supplier"
      onClick={handleSupplierClick}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {supplier.name}
      <button
        type="button"
        className={showBtnClasses}
        onClick={handleEditButton}
      >
        <InfoSVG className="show-supplier-icon" />
      </button>
    </li>
  );
}

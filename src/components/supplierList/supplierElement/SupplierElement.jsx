import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addRoute } from "../../routeSheet/routeSheetSlice";
import {
  setMode,
  setCurrentSupplier,
  openSupplierTab,
} from "../../supplierTab/supplierTabSlice";
import { ReactComponent as InfoSVG } from "../../../assets/icons/info-circle.svg";
import "./SupplierElement.css";

export function SupplierElement({ supplier }) {
  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(setCurrentSupplier(supplier));
    dispatch(setMode("browseSupplier"));
    dispatch(openSupplierTab());
  };

  const handleSupplierClick = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      dispatch(setCurrentSupplier(supplier));
      dispatch(setMode("browseSupplier"));
      dispatch(openSupplierTab());
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
        title="Информация"
      >
        <InfoSVG className="show-supplier-icon" />
      </button>
    </li>
  );
}

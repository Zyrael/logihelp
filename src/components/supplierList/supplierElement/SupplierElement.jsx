import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addRoute } from "../../routeSheet/routeSheetSlice";
import {
  setCurrentSupplier,
  openSupplierTab,
  setMode,
} from "../../supplierTab/supplierTabSlice";
import { ReactComponent as InfoSVG } from "../../../assets/icons/info-circle.svg";
import "./SupplierElement.css";

export function SupplierElement({ supplier }) {
  const [chosen, setChosen] = useState(false);

  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(setCurrentSupplier(supplier));
    dispatch(setMode("browseSupplier"));
    dispatch(openSupplierTab());
  };

  const handleSupplierClick = () => {
    if (window.matchMedia("(min-width: 45rem)").matches) {
      dispatch(addRoute(supplier));
      return;
    }
    setChosen(true);
    setTimeout(() => setChosen(false), 200);
    dispatch(setCurrentSupplier(supplier));
    dispatch(setMode("browseSupplier"));
    dispatch(openSupplierTab());
  };

  const [showButton, setShowButton] = useState(false);
  return (
    <li
      tabIndex={0}
      className={cn("supplier", { chosen })}
      onClick={handleSupplierClick}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {supplier.name}
      <button
        type="button"
        className={cn("show-supplier-btn", { visible: showButton })}
        onClick={handleEditButton}
        title="Информация"
      >
        <InfoSVG className="show-supplier-icon" />
      </button>
    </li>
  );
}

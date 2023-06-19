import React, { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addRoute } from "../../routeSheet/routeSheetSlice";
import {
  setCurrentSupplier,
  openSupplierTab,
  setMode,
} from "../../supplierTab/supplierTabSlice";
import { ReactComponent as InfoSVG } from "../../../assets/icons/add-plus-circle.svg";
import { ReactComponent as CircleCheckSVG } from "../../../assets/icons/circle-check.svg";
import "./SupplierElement.css";

export function SupplierElement({ supplier }) {
  const [chosen, setChosen] = useState(false);
  const [visible, setVisible] = useState(false);
  const routes = useSelector((state) => state.routeSheet.routes);
  const isChosen = routes.find(({ id }) => supplier.id === id);

  const dispatch = useDispatch();
  const handleEditButton = (e) => {
    e.stopPropagation();
    dispatch(addRoute(supplier));
  };

  const handleSupplierClick = () => {
    if (window.matchMedia("(max-width: 45rem)").matches) {
      setChosen(true);
      setTimeout(() => setChosen(false), 200);
    }
    dispatch(setCurrentSupplier(supplier));
    dispatch(setMode("browseSupplier"));
    dispatch(openSupplierTab());
  };

  return (
    <li
      tabIndex={0}
      className={cn("supplier", { chosen })}
      onClick={handleSupplierClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {supplier.name}
      <div
        className={cn("add-to-routes-container", { visible })}
        title={isChosen ? "Добавлено" : "Добавить в маршрутный лист"}
      >
        {!isChosen ? (
          <button
            type="button"
            className="add-to-routes-btn"
            onClick={handleEditButton}
          >
            <InfoSVG className="add-to-routes-icon" />
          </button>
        ) : (
          <CircleCheckSVG className="add-to-routes-icon" />
        )}
      </div>
    </li>
  );
}

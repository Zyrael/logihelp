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
import './SupplierElement.sass'

export function SupplierElement({ supplier }) {
  const [active, setActive] = useState(false);
  const [showAddToRoutes, setShowAddToRoutes] = useState(false);
  const [opened, setOpened] = useState(false)
  const routes = useSelector((state) => state.routeSheet.routes);
  const isChosen = routes.find(({ id }) => supplier.id === id);

  const dispatch = useDispatch();
  const handleAddToRoutes = (e) => {
    e.stopPropagation();
    dispatch(addRoute(supplier));
  };

  const handleSupplierClick = () => {
    if (window.matchMedia("(max-width: 45rem)").matches) {
      setActive(true);
      setTimeout(() => setActive(false), 200);
    }
    dispatch(setCurrentSupplier(supplier));
    dispatch(setMode("browseSupplier"));
    dispatch(openSupplierTab());
  };

  return (
    <li
      tabIndex={0}
      className={cn("supplier", { active })}
      onClick={handleSupplierClick}
      onMouseEnter={() => setShowAddToRoutes(true)}
      onMouseLeave={() => setShowAddToRoutes(false)}
    >
      <div className="supplier-left">
        <div className="supplier-name">{supplier.name}</div>
        {supplier.address && (
          <div className="supplier-address">{supplier.address}</div>
        )}
      </div>

      <div
        className={cn("add-to-routes-container", { visible: showAddToRoutes })}
        title={isChosen ? "Добавлено" : "Добавить в маршрутный лист"}
      >
        {!isChosen ? (
          <button
            type="button"
            className="add-to-routes-btn"
            onClick={handleAddToRoutes}
          >
            <InfoSVG className="add-to-routes-icon" />
          </button>
        ) : (
          <CircleCheckSVG className="add-to-routes-icon" />
        )}
      </div>
      <button
        type="button"
        className="add-to-routes-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpened(!opened)
        }}
      >
        ^
      </button>
      {opened && <div>Opened</div>}
    </li>
  );
}

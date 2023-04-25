import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteElement } from "./routeElement/index";
import "./RouteSheet.css";
import { ReactComponent as Times } from "../../assets/icons/times.svg";
import { ReactComponent as Print } from "../../assets/icons/print.svg";
import { removeAllRoutes } from "./routeSheetSlice";
import { setMode } from "../modal/modalslice";

export function RouteSheet() {
  const routes = useSelector((state) => state.routeSheet.routes);
  const dispatch = useDispatch();
  const handleRemoveRoutes = () => {
    dispatch(removeAllRoutes());
  };
  const handlePrint = () => {
    dispatch(setMode({ mode: "print" }));
  };

  return (
    <>
      <div className="route-sheet-header">
        <div className="route-sheet-title">Маршрутный лист</div>
        <button
          type="button"
          className="blue-btn clear"
          onClick={handleRemoveRoutes}
          disabled={routes.length === 0}
        >
          <Times className="times-icon" />
        </button>
        <button
          type="button"
          className="blue-btn print"
          onClick={handlePrint}
          disabled={routes.length === 0}
        >
          <Print className="print-icon" />
        </button>
      </div>
      <div className="route-list-container">
        <ul className="route-list">
          {routes.map((route) => (
            <RouteElement key={route.id} route={route} />
          ))}
        </ul>
      </div>
    </>
  );
}

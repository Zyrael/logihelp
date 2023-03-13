import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Routes.css";
import { removeAllRoutes } from "./routeList/routeListSlice";
import { setMode } from "../modal/modalslice";
import { RouteList } from "./routeList";
import { ReactComponent as Times } from "../../assets/icons/times.svg";
import { ReactComponent as Print } from "../../assets/icons/print.svg";

export function Routes() {
  const routes = useSelector((state) => state.routeList.routes);
  const dispatch = useDispatch();
  const handleRemoveRoutes = () => {
    dispatch(removeAllRoutes());
  };
  const handlePrint = () => {
    dispatch(setMode({ mode: "print" }));
  };
  return (
    <div className="routes">
      <div className="top-row">
        <span>Маршрутный лист</span>
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
      <RouteList routes={routes} />
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Routes.css";
import { removeAllRoutes } from "./routeList/routeListSlice";
import { RouteList } from "./routeList";
import { ReactComponent as Times } from "../../assets/icons/times.svg";

export function Routes() {
  const routes = useSelector((state) => state.routeList.routes);
  const dispatch = useDispatch();
  const handleRemoveRoutes = () => {
    dispatch(removeAllRoutes());
  };
  return (
    <div className="routes">
      <div className="top-row">
        <span>Маршрутный лист</span>
        <button
          type="button"
          className="clear-routes"
          onClick={handleRemoveRoutes}
          disabled={routes.length === 0}
        >
          <Times className="times" />
        </button>
      </div>
      <hr />
      <RouteList routes={routes} />
    </div>
  );
}

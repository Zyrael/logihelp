import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteElement } from "./routeElement";
import "./RouteList.css";
import { removeAllRoutes } from "./routeListSlice";

export function RouteList() {
  const routes = useSelector((state) => state.routeList.routes);
  const dispatch = useDispatch();
  const handleRemoveRoutes = () => {
    dispatch(removeAllRoutes());
  };
  return (
    <div className="route-list-container">
      <button type="button" onClick={handleRemoveRoutes}>
        Очистить
      </button>
      <ul className="route-list">
        {routes.map((route) => (
          <RouteElement key={route.id} route={route} />
        ))}
      </ul>
    </div>
  );
}

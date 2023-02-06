import React from "react";
import { useSelector } from "react-redux";
import { RouteElement } from "./routeElement";
import "./RouteList.css";

export function RouteList() {
  const routes = useSelector((state) => state.routeList.routes);
  return (
    <div className="route-list-container">
      <ul className="route-list">
        {routes.map((route) => (
          <RouteElement key={route.id} route={route} />
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { RouteElement } from "./routeElement";
import "./RouteList.css";

export function RouteList({ routes }) {
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

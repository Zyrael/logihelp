import React from "react";
import { RouteElement } from "./routeElement";

export function RouteList({ routes }) {
  return (
    <ul className="route-sheet">
      {routes?.map((route) => (
        <RouteElement key={route.id} route={route} />
      ))}
    </ul>
  );
}

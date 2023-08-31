import React from "react";
import "./PlainRouteSheet.css";

export function PlainRouteSheet({ routes }) {
  return (
    <div className="plain-route-sheet">
      {routes.map((route) => (
        <div key={route.id} className="plain-route">
          <h3>{route.name}</h3>
          {route.address && (
            <p>
              <strong>Адрес: </strong>
              {route.address}
            </p>
          )}
          {route.contacts && (
            <p>
              <strong>Контакты: </strong>
              {route.contacts}
            </p>
          )}
          {route.additionalData && (
            <p>
              <strong>Примечание: </strong>
              {route.additionalData}
            </p>
          )}
          {/* <br /> */}
        </div>
      ))}
    </div>
  );
}

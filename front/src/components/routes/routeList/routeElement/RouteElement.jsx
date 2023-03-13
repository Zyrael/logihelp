import React from "react";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeListSlice";
import "./RouteElement.css";

export function RouteElement({ route }) {
  const { name, url, address, contacts, additionalData } = route;
  const dispatch = useDispatch();
  const handleRemoveRoute = () => dispatch(removeRoute(route));

  return (
    <li className="route-element">
      <h3>{name}</h3>
      <a href={url} target="_blank" rel="noreferrer" className="url">
        Сайт
      </a>
      <p>{address}</p>
      <p>{contacts}</p>
      <p>{additionalData}</p>
      <button type="button" className="remove-btn" onClick={handleRemoveRoute}>
        &times;
      </button>
    </li>
  );
}

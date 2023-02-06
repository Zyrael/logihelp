import React from "react";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeListSlice";
import "./RouteElement.css";

export function RouteElement(props) {
  const { route } = props;
  const dispatch = useDispatch();
  const handleRemoveRoute = () => dispatch(removeRoute(route));

  return (
    <li className="route-element" draggable="true">
      <h3>{route.name}</h3>
      <a href={route.webSite}>{route.webSite}</a>
      <p>{route.additionalData}</p>
      <button type="button" className="remove-btn" onClick={handleRemoveRoute}>
        &times;
      </button>
    </li>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeSheetSlice";
import { ReactComponent as RemoveIcon } from "../../../assets/icons/cross.svg";
import "./RouteElement.css";

export function RouteElement({ route }) {
  const { name } = route;
  const dispatch = useDispatch();
  const handleRemoveRoute = () => dispatch(removeRoute(route));

  return (
    <li className="route-element">
      <p>{name}</p>
      <button type="button" className="remove-btn" onClick={handleRemoveRoute}>
        <RemoveIcon className="remove-icon" />
      </button>
    </li>
  );
}

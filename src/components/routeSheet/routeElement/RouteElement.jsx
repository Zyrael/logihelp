import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeSheetSlice";
import { ReactComponent as RemoveIcon } from "../../../assets/icons/cross.svg";
import "./RouteElement.css";

export function RouteElement({ route }) {
  const { name } = route;
  const dispatch = useDispatch();

  const nodeRef = useRef(null);

  const handleRemoveRoute = () => {
    dispatch(removeRoute(route));
  };

  return (
    <li ref={nodeRef} className="route-element">
      <p>{name}</p>
      <button
        type="button"
        className="remove-btn"
        onClick={handleRemoveRoute}
        title="Удалить"
      >
        <RemoveIcon className="remove-icon" />
      </button>
    </li>
  );
}

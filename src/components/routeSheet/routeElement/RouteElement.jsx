import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeSheetSlice";
import { ReactComponent as RemoveIcon } from "../../../assets/icons/cross.svg";
import "./RouteElement.css";

export function RouteElement({ route }) {
  const { name } = route;
  const dispatch = useDispatch();

  const [showRemove, setShowRemove] = useState(false);

  const handleRemoveRoute = () => {
    dispatch(removeRoute(route));
  };

  return (
    <li
      className="route-element"
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <p>{name}</p>
      <button
        type="button"
        className={cn("remove-btn", {
          visible: showRemove,
        })}
        onClick={handleRemoveRoute}
        title="Удалить"
      >
        <RemoveIcon className="remove-icon" />
      </button>
    </li>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { removeRoute } from "../routeListSlice";
import { ReactComponent as RemoveIcon } from "../../../../assets/icons/remove.svg";
import "./RouteElement.css";

export function RouteElement({ route }) {
  const { name, url, address, contacts, additionalData } = route;
  const dispatch = useDispatch();
  const handleRemoveRoute = () => dispatch(removeRoute(route));

  return (
    <li className="route-element">
      <h3>{name}</h3>
      <p>
        <a href={url} target="_blank" rel="noreferrer" className="url">
          {url}
        </a>
      </p>
      {address && (
        <p>
          <b>Адрес: </b>
          {address}
        </p>
      )}
      {contacts && (
        <p>
          <b>Контакты: </b>
          {contacts}
        </p>
      )}
      {additionalData && (
        <p>
          <b>Дополнительно: </b>
          {additionalData}
        </p>
      )}
      <button type="button" className="remove-btn" onClick={handleRemoveRoute}>
        <RemoveIcon className="remove-icon" />
      </button>
    </li>
  );
}

import React from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import "./SupplierInfo.css";
import { closeSupplierInfo } from "./supplierInfoSlice";

export function SupplierInfo() {
  const {
    opened,
    supplier: { name, url, address, contacts, additionalData },
  } = useSelector((state) => state.supplierInfo);

  return (
    <div
      className={cn("supplier-info", {
        "supplier-info--active": opened,
      })}
    >
      <button type="btn" onClick={}>
        X
      </button>
      {name && <h3>{name}</h3>}
      {url && (
        <p>
          <a href={url} target="_blank" rel="noreferrer" className="url">
            {url}
          </a>
        </p>
      )}
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
          <b>Примечание: </b>
          {additionalData}
        </p>
      )}
    </div>
  );
}

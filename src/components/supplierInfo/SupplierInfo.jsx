import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./SupplierInfo.css";
import { closeSupplierInfo } from "./supplierInfoSlice";
import { ReactComponent as Back } from "../../assets/icons/back.svg";

export function SupplierInfo() {
  const {
    opened,
    supplier: { name, url, address, contacts, additionalData },
  } = useSelector((state) => state.supplierInfo);

  const dispatch = useDispatch();

  return (
    <div
      className={cn("supplier-info", {
        "supplier-info--active": opened,
      })}
    >
      <button
        id="close-supplier-info"
        name="close-supplier-info"
        type="button"
        className="close-supplier-info"
        onClick={() => dispatch(closeSupplierInfo())}
      >
        <Back className="close-supplier-icon" />
        {/* <span className="close-supplier-text">Назад</span> */}
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

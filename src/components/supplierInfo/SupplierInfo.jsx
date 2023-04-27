import React, { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./SupplierInfo.css";
import { closeSupplierInfo } from "./supplierInfoSlice";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { ReactComponent as CopySVG } from "../../assets/icons/copy.svg";

export function SupplierInfo() {
  const {
    opened,
    supplier: { name, url, address, contacts, additionalData },
  } = useSelector((state) => state.supplierInfo);

  const dispatch = useDispatch();

  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = (text) => () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleMouseLeave = () => {
    setShowCopy(false);
    setTimeout(() => setCopied(false), 200);
  };

  return (
    <div
      className={cn("supplier-info", {
        "supplier-info--active": opened,
      })}
    >
      <div className="supplier-info-header">
        <button
          id="close-supplier-info"
          name="close-supplier-info"
          type="button"
          className="close-supplier-info"
          onClick={() => dispatch(closeSupplierInfo())}
        >
          <Back className="close-supplier-icon" />
        </button>
        <p className="supplier-info-title">Информация</p>
      </div>
      <div className="supplier-info-main">
        {name && <h3 className="supplier-name">{name}</h3>}
        {url && (
          <div className="supplier-info-text">
            <b>Сайт:</b>
            <p>
              <a href={url} target="_blank" rel="noreferrer" className="url">
                {url}
              </a>
            </p>
          </div>
        )}
        {address && (
          <div
            className="supplier-info-text"
            onMouseEnter={() => setShowCopy(true)}
            onMouseLeave={handleMouseLeave}
          >
            <b>Адрес:</b>
            <p>{address}</p>
            <button
              type="button"
              className={cn("copy-btn", {
                "copy-btn--shown": showCopy,
                "copy-btn--copied": copied,
              })}
              onClick={handleCopy(address)}
            >
              {copied ? "Скопировано!" : <CopySVG className="copy-icon" />}
            </button>
          </div>
        )}
        {contacts && (
          <div className="supplier-info-text">
            <b>Контакты:</b>
            <p>{contacts}</p>
          </div>
        )}
        {additionalData && (
          <div className="supplier-info-text">
            <b>Примечание:</b>
            <p>{additionalData}</p>
          </div>
        )}
      </div>
    </div>
  );
}

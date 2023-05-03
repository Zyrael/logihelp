import React, { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./SupplierInfo.css";
import { closeSupplierInfo } from "./supplierInfoSlice";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { ReactComponent as CopySVG } from "../../assets/icons/copy.svg";
import { ReactComponent as PinSVG } from "../../assets/icons/pin.svg";
import { ReactComponent as ContactSVG } from "../../assets/icons/contact1.svg";
import { ReactComponent as InfoSVG } from "../../assets/icons/exclamation.svg";
import { ReactComponent as UrlSVG } from "../../assets/icons/url.svg";

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
        <div className="supplier-name-container">
          {name && <h3 className="supplier-name">{name}</h3>}
          {url && (
            <div className="supplier-url">
              <UrlSVG className="supplier-url-icon" />
              <p>
                <a href={url} target="_blank" rel="noreferrer" className="url">
                  {url}
                </a>
              </p>
            </div>
          )}
        </div>
        {address && (
          <div
            className="supplier-info-text"
            onMouseEnter={() => setShowCopy(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="icon-container">
              <PinSVG className="supplier-info-icon" />
            </div>

            {/* <b>Адрес:</b> */}
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
            {/* <b>Контакты:</b> */}
            <div className="icon-container">
              <ContactSVG className="supplier-info-icon" />
            </div>
            <p>{contacts}</p>
          </div>
        )}
        {additionalData && (
          <div className="supplier-info-text">
            {/* <b>Примечание:</b> */}
            <div className="icon-container">
              <InfoSVG className="supplier-info-icon" />
            </div>
            <p>{additionalData}</p>
          </div>
        )}
      </div>
    </div>
  );
}

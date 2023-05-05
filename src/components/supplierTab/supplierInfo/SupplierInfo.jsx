import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as CopySVG } from "../../../assets/icons/copy.svg";
import { ReactComponent as PinSVG } from "../../../assets/icons/pin.svg";
import { ReactComponent as ContactSVG } from "../../../assets/icons/contact1.svg";
import { ReactComponent as InfoSVG } from "../../../assets/icons/exclamation.svg";
import { ReactComponent as UrlSVG } from "../../../assets/icons/url.svg";
import { ReactComponent as EditSVG } from "../../../assets/icons/pencil.svg";
import "./SupplierInfo.css";

export function SupplierInfo({ supplierData, setMode }) {
  const { name, url, address, contacts, additionalData } = supplierData;

  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleCopy = (text) => () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleMouseLeave = () => {
    setShowCopy(false);
    setTimeout(() => setCopied(false), 200);
  };

  return (
    <div className="supplier-info">
      <div
        className="supplier-header"
        onMouseEnter={() => setShowEdit(true)}
        onMouseLeave={() => setShowEdit(false)}
      >
        <h3 className="supplier-name">{name}</h3>
        <button
          type="button"
          className={cn("edit-supplier-btn", {
            visible: showEdit,
          })}
          onClick={() => setMode("edit")}
        >
          <EditSVG className="edit-supplier-icon" />
        </button>
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
          <div className="icon-container">
            <ContactSVG className="supplier-info-icon" />
          </div>
          <p>{contacts}</p>
        </div>
      )}
      {additionalData && (
        <div className="supplier-info-text">
          <div className="icon-container">
            <InfoSVG className="supplier-info-icon" />
          </div>
          <p>{additionalData}</p>
        </div>
      )}
    </div>
  );
}

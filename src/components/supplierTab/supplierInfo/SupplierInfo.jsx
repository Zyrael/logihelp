import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as CopySVG } from "../../../assets/icons/copy.svg";
import { ReactComponent as NavSVG } from "../../../assets/icons/navigation-ne.svg";
import { ReactComponent as ContactSVG } from "../../../assets/icons/user.svg";
import { ReactComponent as InfoSVG } from "../../../assets/icons/alert.svg";
import "./SupplierInfo.css";

export function SupplierInfo({ supplierData }) {
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
    <div className="supplier-info">
      <div className="supplier-header">
        <div className="supplier-name">
          <span>{supplierData.name}</span>
        </div>

        {supplierData.url && (
          <div className="supplier-url">
            <p>
              <a
                href={supplierData.url}
                target="_blank"
                rel="noreferrer"
                className="url"
              >
                {supplierData.url}
              </a>
            </p>
          </div>
        )}
      </div>
      {supplierData.address && (
        <div
          className="supplier-info-text"
          onMouseEnter={() => setShowCopy(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="icon-container">
            <NavSVG className="supplier-info-icon" />
          </div>

          <p>{supplierData.address}</p>
          <button
            type="button"
            className={cn("copy-btn", {
              "copy-btn--shown": showCopy,
              "copy-btn--copied": copied,
            })}
            onClick={handleCopy(supplierData.address)}
          >
            {copied ? "Скопировано!" : <CopySVG className="copy-icon" />}
          </button>
        </div>
      )}
      {supplierData.contacts && (
        <div className="supplier-info-text">
          <div className="icon-container">
            <ContactSVG className="supplier-info-icon" />
          </div>
          <p>{supplierData.contacts}</p>
        </div>
      )}
      {supplierData.additionalData && (
        <div className="supplier-info-text">
          <div className="icon-container">
            <InfoSVG className="supplier-info-icon" />
          </div>
          <p>{supplierData.additionalData}</p>
        </div>
      )}
    </div>
  );
}

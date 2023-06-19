import React from "react";
// import cn from "classnames";
// import { ReactComponent as CopySVG } from "../../../assets/icons/copy.svg";
import { useSelector } from "react-redux";
import { ReactComponent as NavSVG } from "../../../assets/icons/map.svg";
import { ReactComponent as ContactSVG } from "../../../assets/icons/phone.svg";
import { ReactComponent as InfoSVG } from "../../../assets/icons/info-circle.svg";
import "./SupplierInfo.css";

export function SupplierInfo() {
  const { currentSupplier } = useSelector((state) => state.supplierTab);

  return (
    <div className="supplier-info">
      <div className="supplier-header">
        <div className="supplier-name">
          <span>{currentSupplier.name}</span>
        </div>

        {currentSupplier.url && (
          <div className="supplier-url">
            <a
              href={currentSupplier.url}
              target="_blank"
              rel="noreferrer"
              className="url"
            >
              {new URL(currentSupplier.url).hostname}
            </a>
          </div>
        )}
      </div>
      {currentSupplier.address && (
        <div className="supplier-info-text">
          <div className="icon-container">
            <NavSVG className="supplier-info-icon" />
          </div>
          <p>{currentSupplier.address}</p>
        </div>
      )}
      {currentSupplier.contacts && (
        <div className="supplier-info-text">
          <div className="icon-container">
            <ContactSVG className="supplier-info-icon" />
          </div>
          <p>{currentSupplier.contacts}</p>
        </div>
      )}
      {currentSupplier.additionalData && (
        <div className="supplier-info-text">
          <div className="icon-container">
            <InfoSVG className="supplier-info-icon supplier-additional-icon" />
          </div>
          <p>{currentSupplier.additionalData}</p>
        </div>
      )}
    </div>
  );
}

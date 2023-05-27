import React, { useState } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { ReactComponent as CopySVG } from "../../../assets/icons/copy.svg";
import { ReactComponent as NavSVG } from "../../../assets/iconpack/navigation-ne.svg";
import { ReactComponent as ContactSVG } from "../../../assets/iconpack/user.svg";
import { ReactComponent as InfoSVG } from "../../../assets/iconpack/alert-square.svg";
import { ReactComponent as EditSVG } from "../../../assets/iconpack/edit.svg";
import { setMode } from "../supplierInfoSlice";
import "./SupplierInfo.css";

export function SupplierInfo({ supplierData }) {
  const { name, url, address, contacts, additionalData } = supplierData;

  const dispatch = useDispatch();

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
        <div className="supplier-name">
          <span>{name}</span>
          <button
            type="button"
            className={cn("edit-supplier-btn", {
              visible: showEdit,
            })}
            onClick={() => dispatch(setMode("edit"))}
          >
            <EditSVG className="edit-supplier-icon" />
          </button>
        </div>

        {url && (
          <div className="supplier-url">
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
            <NavSVG className="supplier-info-icon" />
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

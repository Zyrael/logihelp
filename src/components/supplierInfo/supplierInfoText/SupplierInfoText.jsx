import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as CopySVG } from "../../../assets/icons/copy.svg";

export function SupplierInfoText({ children, text }) {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleMouseLeave = () => {
    setShowCopy(false);
    setTimeout(() => setCopied(false), 200);
  };
  return (
    <div
      className="supplier-info-text"
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <button
        type="button"
        className={cn("copy-btn", {
          "copy-btn--shown": showCopy,
          "copy-btn--copied": copied,
        })}
        onClick={handleCopy}
      >
        {copied ? "Скопировано!" : <CopySVG className="copy-icon" />}
      </button>
    </div>
  );
}

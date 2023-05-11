import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./SupplierTab.css";
import { closeSupplierInfo } from "./supplierInfoSlice";
import { ReactComponent as BackSVG } from "../../assets/iconpack/chevron-left.svg";
import { SupplierInfo } from "./supplierInfo";
import { SupplierForm } from "./supplierForm";

export function SupplierTab() {
  const { opened, supplier } = useSelector((state) => state.supplierInfo);

  const [supplierData, setSupplierData] = useState({});

  useEffect(() => setSupplierData(supplier), [supplier]);
  const [mode, setMode] = useState("browse");

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSupplierInfo());
    setMode("browse");
  };

  return (
    <div
      className={cn("supplier-tab", {
        "supplier-tab--active": opened,
      })}
    >
      <div className="supplier-tab-header">
        <button
          id="close-supplier-tab"
          name="close-supplier-tab"
          type="button"
          className="close-supplier-tab"
          onClick={handleClose}
        >
          <BackSVG className="close-supplier-icon" />
        </button>
        <p className="supplier-tab-title">Информация</p>
      </div>
      <div className="supplier-tab-main">
        {mode === "browse" ? (
          <SupplierInfo supplierData={supplierData} setMode={setMode} />
        ) : (
          <SupplierForm
            supplierData={supplierData}
            mode={mode}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
}

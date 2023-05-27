import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./SupplierTab.css";
import { closeSupplierInfo } from "./supplierInfoSlice";
import { ReactComponent as BackSVG } from "../../assets/iconpack/chevron-left.svg";
import { SupplierInfo } from "./supplierInfo";
import { SupplierForm } from "./supplierForm";

export function SupplierTab() {
  const { opened, mode, supplier } = useSelector((state) => state.supplierInfo);

  const [supplierData, setSupplierData] = useState({});

  useEffect(() => {
    setSupplierData(
      mode === "create"
        ? {
            name: "",
            url: "",
            address: "",
            contacts: "",
            additionalData: "",
          }
        : supplier
    );
  }, [supplier]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSupplierInfo());
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
          <SupplierInfo supplierData={supplierData} />
        ) : (
          <SupplierForm
            supplierData={supplierData}
            setSupplierData={setSupplierData}
          />
        )}
      </div>
    </div>
  );
}

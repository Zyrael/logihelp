import React from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./SupplierTab.css";
import {
  clearSupplierTab,
  closeSupplierTab,
  setMode,
} from "./supplierTabSlice";
import { ReactComponent as BackSVG } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as EditSVG } from "../../assets/icons/edit.svg";
import { SupplierInfo } from "./supplierInfo";
import { SupplierForm } from "./supplierForm";

const contentMap = {
  browseSupplier: <SupplierInfo />,
  createSupplier: <SupplierForm />,
  editSupplier: <SupplierForm />,
};

export function SupplierTab() {
  const { supplierTabOpened, mode } = useSelector((state) => state.supplierTab);

  const dispatch = useDispatch();

  const handleBackButton = () => {
    if (mode === "editSupplier") {
      dispatch(setMode("browseSupplier"));
      return;
    }
    dispatch(closeSupplierTab());
    setTimeout(() => {
      dispatch(clearSupplierTab());
    }, 200);
  };

  return (
    <div
      className={cn("supplier-tab", {
        "supplier-tab--active": supplierTabOpened,
      })}
    >
      <div className="supplier-tab-header">
        <button
          id="close-supplier-tab"
          name="close-supplier-tab"
          type="button"
          className="close-supplier-tab"
          onClick={handleBackButton}
          title="Назад"
        >
          <BackSVG className="close-supplier-icon" />
        </button>
        <p className="supplier-tab-title">
          {mode === "browseSupplier" && "Информация"}
          {mode === "editSupplier" && "Изменить"}
          {mode === "createSupplier" && "Добавить поставщика"}
        </p>
        {mode === "browseSupplier" && (
          <button
            type="button"
            className="edit-supplier-btn"
            onClick={() => dispatch(setMode("editSupplier"))}
            title="Изменить"
          >
            <EditSVG className="edit-supplier-icon" />
          </button>
        )}
      </div>
      <div className="supplier-tab-main">{contentMap[mode] ?? null}</div>
    </div>
  );
}

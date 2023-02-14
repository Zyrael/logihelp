import React from "react";
import { useDispatch } from "react-redux";
import { addRoute } from "../../../routeList/routeListSlice";
import { openModalWithContent } from "../../../modal/modalslice";
import { SupplierInfo } from "../../../supplierInfo";

export function SupplierItem({ supplier }) {
  const dispatch = useDispatch();
  const handleSeeButton = (e) => {
    e.stopPropagation();
    dispatch(openModalWithContent(<SupplierInfo supplier={supplier} />));
  };

  return (
    <li tabIndex={0} onClick={() => dispatch(addRoute(supplier))}>
      {supplier.name}
      <button type="button" onClick={handleSeeButton}>
        See more
      </button>
    </li>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { addRoute } from "../../../routeList/routeListSlice";
import { openModal } from "../../../modal/modalslice";

export function SupplierItem({ supplier }) {
  const dispatch = useDispatch();
  const handleSeeButton = (e) => {
    e.stopPropagation();
    dispatch(openModal());
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

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SUPPLIER,
  refetchSuppliers,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
} from "../../../graphql";
import { ReactComponent as XSVG } from "../../../assets/icons/close.svg";
import { ReactComponent as CheckSVG } from "../../../assets/icons/check.svg";
import { setMode, closeSupplierTab } from "../supplierTabSlice";
import { SupplierInput } from "./supplierInput";
import { updateRoute } from "../../routeSheet/routeSheetSlice";
import "./SupplierForm.css";
import { Loading } from "../../loading";

export function SupplierForm({ supplierData, setSupplierData }) {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.supplierTab);

  const [nameError, setNameError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    mode === "createSupplier" ? {} : supplierData
  );

  const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  const [updateSupplier] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER, refetchSuppliers);

  const trimData = (data) => {
    const keys = Object.keys(data);
    const trimmed = {};
    keys.forEach((key) => {
      if (!data[key] || key === "id") {
        trimmed[key] = data[key];
        return;
      }
      trimmed[key] = data[key].replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    });
    return trimmed;
  };

  const validateForm = () => {
    setNameError(formData.name.trim() === "");
    setUrlError(!!formData.url && !urlRegex.test(formData.url));
  };

  const submitAction = {
    createSupplier: (data) =>
      addSupplier({
        variables: data,
      }),
    editSupplier: (data) =>
      updateSupplier({
        variables: data,
      }),
  };

  const handleDelete = () => {
    if (!confirm("Вы уверены?")) return;
    setLoading(true);
    deleteSupplier({
      variables: formData,
    }).then(() => {
      setLoading(false);
      dispatch(closeSupplierTab());
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameError || urlError) return;
    setLoading(true);
    const trimmedData = trimData(formData);
    submitAction[mode](trimmedData).then(({ data }) => {
      if (mode === "editSupplier") dispatch(updateRoute(data.updateSupplier));
      setLoading(false);
      setSupplierData(trimmedData);
      dispatch(setMode("browseSupplier"));
    });
  };

  const onChange = (key) => (e) => {
    validateForm();
    setFormData({ ...formData, [key]: e.currentTarget.value });
  };

  const onBlur = () => validateForm();

  return (
    <form className="supplier-form" onSubmit={handleSubmit}>
      <SupplierInput
        data={formData.name ?? ""}
        label="Название"
        onChange={onChange("name")}
        onBlur={onBlur}
        danger={!!nameError}
        required
      />
      {nameError && <div className="danger-text">Введите имя</div>}
      <SupplierInput
        data={formData.url ?? ""}
        label="Сайт"
        onChange={onChange("url")}
        onBlur={onBlur}
        danger={!!urlError}
        required
      />
      {urlError && <div className="danger-text">Введите корректный URL</div>}
      <SupplierInput
        data={formData.address ?? ""}
        label="Адрес"
        onChange={onChange("address")}
        onBlur={onBlur}
        required
      />
      <SupplierInput
        data={formData.contacts ?? ""}
        label="Контакты"
        onChange={onChange("contacts")}
        onBlur={onBlur}
        required
      />
      <SupplierInput
        data={formData.additionalData ?? ""}
        label="Примечание"
        onChange={onChange("additionalData")}
        onBlur={onBlur}
        required
      />
      <div className="supplier-form-footer">
        {mode === "editSupplier" && (
          <button
            type="button"
            className="supplier-form-btn supplier-form-delete"
            onClick={() => handleDelete()}
            title="Удалить"
          >
            <XSVG className="submit-icon" />
          </button>
        )}
        <button
          type="submit"
          className="supplier-form-btn supplier-form-submit"
          title="Сохранить"
        >
          <CheckSVG className="submit-icon" />
        </button>
      </div>
      {loading && <Loading />}
    </form>
  );
}

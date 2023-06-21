import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as XSVG } from "../../../assets/icons/cross.svg";
import { ReactComponent as CheckSVG } from "../../../assets/icons/check.svg";
import {
  setMode,
  closeSupplierTab,
  setCurrentSupplier,
  clearSupplierTab,
} from "../supplierTabSlice";
import { SupplierInput } from "./supplierInput";
import { removeRoute, updateRoute } from "../../routeSheet/routeSheetSlice";
import "./SupplierForm.css";
import { Loading } from "../../loading";
import { ServerContext } from "../../../ServerContext";

export function SupplierForm() {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  const dispatch = useDispatch();
  const { mode, currentSupplier } = useSelector((state) => state.supplierTab);

  const { addSupplier, updateSupplier, deleteSupplier } =
    useContext(ServerContext);

  const [nameError, setNameError] = useState(false);
  const [urlError, setURLError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(currentSupplier);

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
    const nameValidated = formData.name.trim() === "";
    setNameError(nameValidated);

    const URLValidated = !!formData.url && !urlRegex.test(formData.url);
    setURLError(URLValidated);

    return !nameValidated && !URLValidated;
  };

  const submitAction = {
    createSupplier: (data) => addSupplier(data),
    editSupplier: (data) => updateSupplier(data),
  };

  const handleDelete = () => {
    if (!confirm("Удалить поставщика?")) return;
    setLoading(true);
    deleteSupplier(formData).then(() => {
      dispatch(removeRoute(formData));
      setLoading(false);
      setTimeout(() => {
        dispatch(clearSupplierTab());
      }, 200);
      dispatch(closeSupplierTab());
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validateForm();
    if (!validated) return;
    setLoading(true);
    const trimmedData = trimData(formData);
    submitAction[mode](trimmedData).then(({ data }) => {
      const newData = data.updateSupplier || data.addSupplier;
      if (mode === "editSupplier") dispatch(updateRoute(newData));
      setLoading(false);
      dispatch(setCurrentSupplier(newData));
      dispatch(setMode("browseSupplier"));
    });
  };

  const onChange = (key) => (e) => {
    if (key === "name") setNameError(false);
    if (key === "url") setURLError(false);
    setFormData({ ...formData, [key]: e.currentTarget.value });
  };

  const onBlur = () => validateForm();

  const onKeyDown = (e) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      className="supplier-form"
      onSubmit={handleSubmit}
      onKeyDown={onKeyDown}
    >
      <SupplierInput
        data={formData.name ?? ""}
        label="Название"
        onChange={onChange("name")}
        onBlur={onBlur}
        error={nameError}
        required
      />
      {nameError && <div className="danger-text">Введите название</div>}
      <SupplierInput
        data={formData.url ?? ""}
        label="Сайт"
        onChange={onChange("url")}
        onBlur={onBlur}
        error={urlError}
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
            <XSVG className="delete-supplier-icon" />
          </button>
        )}
        <button
          type="submit"
          className="supplier-form-btn supplier-form-submit"
          title="Сохранить"
        >
          <CheckSVG className="submit-supplier-icon" />
        </button>
      </div>
      {loading && <Loading />}
    </form>
  );
}

import React, { useState } from "react";
import cn from "classnames";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SUPPLIER,
  refetchSuppliers,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
} from "../../../graphql";
import { ReactComponent as NavSVG } from "../../../assets/iconpack/navigation-ne.svg";
import { ReactComponent as ContactSVG } from "../../../assets/iconpack/user.svg";
import { ReactComponent as InfoSVG } from "../../../assets/iconpack/alert-square.svg";
import { ReactComponent as XSVG } from "../../../assets/iconpack/x-circle.svg";
import { ReactComponent as SaveSVG } from "../../../assets/icons/save1.svg";
import { ReactComponent as LoadingSVG } from "../../../assets/icons/loading.svg";
import { setMode, closeSupplierInfo } from "../supplierInfoSlice";
import "./SupplierForm.css";

export function SupplierForm({ supplierData, setSupplierData }) {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState(supplierData);

  const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  const [updateSupplier] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER, refetchSuppliers);

  const { mode } = useSelector((state) => state.supplierInfo);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (value) => setValidated(value.trim() !== "");

  const handleNameChange = (e) => {
    setValidated(true);
    handleChange(e);
  };

  const submitAction = {
    create: (data) =>
      addSupplier({
        variables: data,
      }),
    edit: (data) =>
      updateSupplier({
        variables: data,
      }),
  };

  const handleDelete = () => {
    if (!confirm("Вы уверены?")) return;
    setDeleting(true);
    deleteSupplier({
      variables: formData,
    }).then(() => {
      setDeleting(false);
      dispatch(closeSupplierInfo());
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validated) return;
    setSubmitting(true);
    const trimmedData = trimData(formData);
    submitAction[mode](trimmedData).then(() => {
      setSubmitting(false);
      setSupplierData(trimmedData);
      dispatch(setMode("browse"));
    });
  };

  return (
    <form className="supplier-form" onSubmit={handleSubmit}>
      <div className="supplier-header">
        <div className="supplier-name">
          <input
            type="text"
            name="name"
            placeholder="Название"
            value={formData.name}
            onChange={handleNameChange}
            onBlur={() => validate(formData.name)}
            className={cn("supplier-name-input", { unvalidated: !validated })}
            required
            autoComplete="off"
          />
          {!validated && (
            <div className="unvalidated-danger">Введите название</div>
          )}
        </div>
        <div className="supplier-url">
          <input
            type="url"
            placeholder="Сайт"
            name="url"
            className="supplier-url-input"
            value={formData.url ?? ""}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="supplier-info-text">
        <div className="icon-container">
          <NavSVG className="supplier-info-icon" />
        </div>

        <textarea
          name="address"
          id="address"
          placeholder="Адрес"
          className="supplier-textarea"
          value={formData.address ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="supplier-info-text">
        <div className="icon-container">
          <ContactSVG className="supplier-info-icon" />
        </div>
        <textarea
          name="contacts"
          id="contacts"
          placeholder="Контакты"
          className="supplier-textarea"
          value={formData.contacts ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="supplier-info-text">
        <div className="icon-container">
          <InfoSVG className="supplier-info-icon" />
        </div>
        <textarea
          name="additionalData"
          id="additional-data"
          placeholder="Примечание"
          className="supplier-textarea"
          value={formData.additionalData ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="supplier-form-footer">
        {mode === "edit" && (
          <button
            type="button"
            className="form-footer-btn form-delete-btn"
            onClick={() => handleDelete()}
          >
            <div className="footer-icon">
              {deleting ? (
                <LoadingSVG className="submit-icon" />
              ) : (
                <XSVG className="x-icon" />
              )}
            </div>
            <div className="footer-text">
              <span>Удалить</span>
            </div>
          </button>
        )}
        <button type="submit" className="form-footer-btn form-submit-btn">
          <div className="footer-icon">
            {submitting ? (
              <LoadingSVG className="submit-icon" />
            ) : (
              <SaveSVG className="submit-icon" />
            )}
          </div>
          <div className="footer-text">
            <span>Сохранить</span>
          </div>
        </button>
      </div>
    </form>
  );
}

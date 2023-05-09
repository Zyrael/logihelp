import React, { useState } from "react";
import cn from "classnames";
// import { useMutation } from "@apollo/client";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ADD_SUPPLIER,
//   refetchSuppliers,
//   UPDATE_SUPPLIER,
//   DELETE_SUPPLIER,
// } from "../../../graphql";
import { DeletePrompt } from "./deletePrompt";
import { ReactComponent as PinSVG } from "../../../assets/icons/pin.svg";
import { ReactComponent as ContactSVG } from "../../../assets/icons/contact1.svg";
import { ReactComponent as InfoSVG } from "../../../assets/icons/exclamation.svg";
import { ReactComponent as UrlSVG } from "../../../assets/icons/url.svg";
import { ReactComponent as SaveSVG } from "../../../assets/icons/save.svg";
import "./SupplierForm.css";

export function SupplierForm({ supplierData, mode, setMode }) {
  const [validated, setValidated] = useState(true);

  const [formData, setFormData] = useState(supplierData);

  // const trimData = () => {
  //   const keys = Object.keys(formData);
  //   keys.forEach((key) => {
  //     if (!formData[key] || key === "id") return;
  //
  //     formData[key] = formData[key]
  //       .replace(/\n/g, " ")
  //       .replace(/\s+/g, " ")
  //       .trim();
  //   });
  // };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [deleting, setDeleting] = useState(false);

  const validate = (value) => setValidated(value.trim() !== "");

  const handleNameChange = (e) => {
    setValidated(true);
    handleChange(e);
  };

  // const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  // const [updateSupplier] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
  // const [deleteSupplier] = useMutation(DELETE_SUPPLIER, refetchSuppliers);
  //
  // const mode = useSelector((state) => state.modal.mode);
  //
  // const submitAction = {
  //   create: () =>
  //     addSupplier({
  //       variables: {
  //         name: formData.name,
  //         url: formData.url,
  //         address: formData.address,
  //         contacts: formData.contacts,
  //         additionalData: formData.additionalData,
  //       },
  //     }),
  //   edit: () =>
  //     updateSupplier({
  //       variables: {
  //         updateSupplierId: formData.id,
  //         name: formData.name,
  //         url: formData.url,
  //         address: formData.address,
  //         contacts: formData.contacts,
  //         additionalData: formData.additionalData,
  //       },
  //     }),
  // };

  // const dispatch = useDispatch();

  // const handleDelete = () => {
  //   deleteSupplier({
  //     variables: {
  //       deleteSupplierId: formData.id,
  //     },
  //   });
  //   dispatch(setMode({ mode: "closed" }));
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!validated) return;
  //   trimData();
  //   submitAction[mode]();
  //   dispatch(setMode({ mode: "closed" }));
  // };

  return (
    <form className="supplier-form" onSubmit={() => setMode("browse")}>
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
        </div>
        <div className="supplier-url">
          <UrlSVG className="supplier-url-icon" />
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
          <PinSVG className="supplier-info-icon" />
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
          placeholder="Дополнительно"
          className="supplier-textarea"
          value={formData.additionalData ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="supplier-form-footer">
        {mode === "edit" && (
          <button
            type="button"
            className="text-btn delete"
            onClick={() => setDeleting(true)}
          >
            Удалить
          </button>
        )}
        <button type="submit" className="submit-btn">
          <SaveSVG className="submit-icon" />
          <span>Сохранить</span>
        </button>
      </div>
    </form>
  );
}

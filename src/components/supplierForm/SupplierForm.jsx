import React, { useState } from "react";
import cn from "classnames";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SUPPLIER,
  refetchSuppliers,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
} from "../../graphql";
import { setMode } from "../modal/modalslice";
import { DeletePrompt } from "./deletePrompt";
import "./SupplierForm.css";

export function SupplierForm({ content }) {
  const [validated, setValidated] = useState(true);

  const [formData, setFormData] = useState(content);

  const trimData = () => {
    const keys = Object.keys(formData);
    keys.forEach((key) => {
      formData[key] = formData[key].trim();
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [deleting, setDeleting] = useState(false);

  const validate = (value) => setValidated(value.trim() !== "");

  const handleNameChange = (e) => {
    setValidated(true);
    handleChange(e);
  };

  const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  const [updateSupplier] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER, refetchSuppliers);

  const mode = useSelector((state) => state.modal.mode);

  const submitAction = {
    create: () =>
      addSupplier({
        variables: {
          name: formData.name,
          url: formData.url,
          address: formData.address,
          contacts: formData.contacts,
          additionalData: formData.additionalData,
        },
      }),
    edit: () =>
      updateSupplier({
        variables: {
          updateSupplierId: formData.id,
          name: formData.name,
          url: formData.url,
          address: formData.address,
          contacts: formData.contacts,
          additionalData: formData.additionalData,
        },
      }),
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteSupplier({
      variables: {
        deleteSupplierId: formData.id,
      },
    });
    dispatch(setMode({ mode: "closed" }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validated) return;
    trimData();
    submitAction[mode]();
    dispatch(setMode({ mode: "closed" }));
  };

  return (
    <div className="supplier-form-container">
      <form className="supplier-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          onBlur={() => validate(formData.name)}
          className={cn("name-input", { unvalidated: !validated })}
          required
          autoComplete="off"
        />
        {!validated && <span className="unvalidated-span">Введите имя</span>}
        <input
          type="url"
          placeholder="Сайт"
          name="url"
          value={formData.url}
          onChange={handleChange}
          autoComplete="off"
        />
        <textarea
          name="address"
          id="address"
          placeholder="Адрес"
          value={formData.address}
          onChange={handleChange}
        />
        <textarea
          name="contacts"
          id="contacts"
          placeholder="Контакты"
          value={formData.contacts}
          onChange={handleChange}
        />
        <textarea
          name="additionalData"
          id="additional-data"
          placeholder="Дополнительно"
          value={formData.additionalData}
          onChange={handleChange}
        />
        <div className="footer">
          {mode === "edit" && (
            <button
              type="button"
              className="text-btn delete"
              onClick={() => setDeleting(true)}
            >
              Удалить
            </button>
          )}
          <button type="submit" className="text-btn submit">
            Сохранить
          </button>
        </div>
      </form>
      {deleting && (
        <DeletePrompt handleDelete={handleDelete} setDeleting={setDeleting} />
      )}
    </div>
  );
}

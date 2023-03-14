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
import "./SupplierForm.css";

export function SupplierForm({ content }) {
  const {
    id,
    name: currName,
    url: currUrl,
    address: currAddress,
    contacts: currContacts,
    additionalData: currData,
  } = content;
  const [name, setName] = useState(currName);
  const [url, setUrl] = useState(currUrl);
  const [address, setAddress] = useState(currAddress);
  const [contacts, setContacts] = useState(currContacts);
  const [additionalData, setAdditionalData] = useState(currData);
  const [validated, setValidated] = useState(true);

  const validate = (value) => setValidated(value.trim() !== "");

  const onNameChange = (e) => {
    setValidated(true);
    setName(e.target.value);
  };

  const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  const [updateSupplier] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER, refetchSuppliers);

  const mode = useSelector((state) => state.modal.mode);

  const submitAction = {
    create: () =>
      addSupplier({
        variables: {
          name: name.trim(),
          url,
          address: address.trim(),
          contacts: contacts.trim(),
          additionalData: additionalData.trim(),
        },
      }),
    edit: () =>
      updateSupplier({
        variables: {
          updateSupplierId: id,
          name: name.trim(),
          url,
          address: address.trim(),
          contacts: contacts.trim(),
          additionalData: additionalData.trim(),
        },
      }),
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteSupplier({
      variables: {
        deleteSupplierId: id,
      },
    });
    dispatch(setMode({ mode: "closed" }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validated) return;
    submitAction[mode]();
    dispatch(setMode({ mode: "closed" }));
  };

  return (
    <div className="supplier-form-container">
      <form className="supplier-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={onNameChange}
          onBlur={() => validate(name)}
          className={cn("name-input", { unvalidated: !validated })}
          required
        />
        {!validated && <span className="unvalidated-span">Введите имя</span>}
        <input
          type="url"
          placeholder="Сайт"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          name="address"
          id="address"
          placeholder="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          name="contacts"
          id="contacts"
          placeholder="Контакты"
          value={contacts}
          onChange={(e) => setContacts(e.target.value)}
        />
        <textarea
          name="additional-data"
          id="additional-data"
          placeholder="Дополнительно"
          value={additionalData}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
        <div className="footer">
          <div className="buttons">
            {mode === "edit" && (
              <button type="button" className="delete" onClick={handleDelete}>
                УДАЛИТЬ
              </button>
            )}
            <button type="submit" className="submit">
              СОХРАНИТЬ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

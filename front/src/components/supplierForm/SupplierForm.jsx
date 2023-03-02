import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SUPPLIER, refetchSuppliers, UPDATE_SUPPLIER } from "../../graphql";
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

  const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  const [updateSupplier] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);

  const mode = useSelector((state) => state.modal.mode);

  const submitAction = {
    create: () =>
      addSupplier({
        variables: {
          name,
          url,
          address,
          contacts,
          additionalData,
        },
      }),
    edit: () =>
      updateSupplier({
        variables: {
          id,
          name,
          url,
          address,
          contacts,
          additionalData,
        },
      }),
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
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
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
}

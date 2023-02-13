import React, { useState } from "react";
import "./SupplierForm.css";

export function SupplierForm({ closeModal, addSupplier }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [additionalData, setAdditionalData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addSupplier({
      variables: {
        name,
        url,
        additionalData,
      },
    });
    closeModal();
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
          type="text"
          placeholder="Сайт"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
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

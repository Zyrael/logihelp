import React, { useState } from "react";
import "./SupplierForm.css";

export function SupplierForm({
  closeModal,
  addSupplier,
  data = { name: "", webSite: "", additionalData: "" },
}) {
  const [name, setName] = useState(data.name);
  const [webSite, setWebSite] = useState(data.webSite);
  const [additionalData, setAdditionalData] = useState(data.additionalData);
  const handleSubmit = (e) => {
    e.preventDefault();
    addSupplier({
      variables: {
        name,
        webSite,
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
          value={webSite}
          onChange={(e) => setWebSite(e.target.value)}
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

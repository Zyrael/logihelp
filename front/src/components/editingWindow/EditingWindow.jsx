import React, { useState } from "react";
import cn from "classnames";
import "./EditingWindow.css";

export function EditingWindow({
  editing,
  handleDisableEditing,
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
    handleDisableEditing();
  };

  return (
    <div
      className={cn({
        "editing-container": true,
        shown: editing,
      })}
    >
      <div className="editing-inner">
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
          <button type="submit">Сохранить</button>
        </form>
        <button
          type="button"
          className="close-btn"
          onClick={handleDisableEditing}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

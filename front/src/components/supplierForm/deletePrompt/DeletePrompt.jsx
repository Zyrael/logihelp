import React from "react";
import "./DeletePrompt.css";

export function DeletePrompt({ handleDelete, setDeleting }) {
  return (
    <div className="delete-backdrop">
      <div className="delete-prompt">
        <p className="delete-text">Удалить поставщика?</p>
        <div className="delete-footer">
          <button
            type="button"
            className="text-btn cancel"
            onClick={() => setDeleting(false)}
          >
            Отмена
          </button>
          <button
            type="button"
            className="text-btn delete"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

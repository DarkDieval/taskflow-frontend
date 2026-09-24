import React from "react";
import "./SelectionToolbar.css";

function SelectionToolbar({ count, onClear, onDeleteSelected }) {
  if (count === 0) return null;

  return (
    <div className="selection-toolbar">
      <span className="selection-toolbar__count">
        {count} {count === 1 ? "seleccionada" : "seleccionadas"}
      </span>
      <div className="selection-toolbar__actions">
        <button
          className="selection-toolbar__button selection-toolbar__button_cancel"
          onClick={onClear}
        >
          Cancelar
        </button>
        <button
          className="selection-toolbar__button selection-toolbar__button_delete"
          onClick={onDeleteSelected}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default SelectionToolbar;

import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        placeholder="¿Qué necesitas hacer?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={100}
      />
      <input
        className="task-form__input task-form__input_type_description"
        type="text"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
      />
      <button
        className="task-form__button"
        type="submit"
        disabled={!title.trim()}
      >
        Añadir tarea
      </button>
    </form>
  );
}

export default TaskForm;

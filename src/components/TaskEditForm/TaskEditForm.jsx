import { useState } from "react";
import "./TaskEditForm.css";

function TaskEditForm({ task, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave(task._id, {
      title,
      description,
      isCompleted,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
  };

  return (
    <>
      <label className="modal__label">
        Título
        <input
          className="modal__input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
        />
      </label>
      <label className="modal__label">
        Descripción
        <input
          className="modal__input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
        />
      </label>
      <label className="modal__label">
        Fecha de vencimiento
        <input
          className="modal__input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label className="task-edit__checkbox-label">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        Marcar como completada
      </label>
      <button
        type="submit"
        className="modal__submit-button"
        onClick={handleSubmit}
      >
        Guardar cambios
      </button>
    </>
  );
}

export default TaskEditForm;

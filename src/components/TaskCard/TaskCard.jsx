import React from "react";
import "./TaskCard.css";

function TaskCard({ task, onToggle, onDelete }) {
  const handleToggle = () => {
    onToggle(task._id, !task.isCompleted);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <li
      className={`task-card ${task.isCompleted ? "task-card_completed" : ""}`}
    >
      <label className="task-card__checkbox-label">
        <input
          className="task-card__checkbox"
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
        />
        <div className="task-card__content">
          <h3 className="task-card__title">{task.title}</h3>
          {task.description && (
            <p className="task-card__description">{task.description}</p>
          )}
        </div>
      </label>
      <button
        className="task-card__delete"
        onClick={handleDelete}
        aria-label="Eliminar tarea"
      >
        🗑️
      </button>
    </li>
  );
}

export default TaskCard;

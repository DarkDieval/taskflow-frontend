import "./TaskCard.css";

function formatDueDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const due = new Date(date);
  due.setHours(0, 0, 0, 0);

  let label = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });

  if (due.getTime() === today.getTime()) {
    label = "Hoy";
  } else if (due.getTime() === tomorrow.getTime()) {
    label = "Mañana";
  } else if (due < today) {
    label = `Vencida (${label})`;
  }

  return {
    label,
    isOverdue: due < today,
    isToday: due.getTime() === today.getTime(),
    isTomorrow: due.getTime() === tomorrow.getTime(),
  };
}

function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
  isSelected,
  onSelectToggle,
}) {
  const handleToggle = () => {
    onToggle(task._id, !task.isCompleted);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleSelect = () => {
    onSelectToggle(task._id);
  };

  const dueInfo = formatDueDate(task.dueDate);

  return (
    <li
      className={`task-card ${
        task.isCompleted ? "task-card_completed" : ""
      } ${isSelected ? "task-card_selected" : ""}`}
    >
      <label className="task-card__checkbox-label">
        <input
          className="task-card__checkbox"
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
          aria-label="Marcar como completada"
        />
        <div className="task-card__content">
          <h3 className="task-card__title">{task.title}</h3>
          {task.description && (
            <p className="task-card__description">{task.description}</p>
          )}
          {dueInfo && (
            <span
              className={`task-card__due ${
                dueInfo.isOverdue && !task.isCompleted
                  ? "task-card__due_overdue"
                  : ""
              } ${dueInfo.isToday ? "task-card__due_today" : ""} ${
                dueInfo.isTomorrow ? "task-card__due_tomorrow" : ""
              }`}
            >
              📅 {dueInfo.label}
            </span>
          )}
        </div>
      </label>

      <div className="task-card__actions">
        <label
          className="task-card__select-label"
          aria-label="Seleccionar tarea"
        >
          <input
            className="task-card__select-checkbox"
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
          />
        </label>
        <button
          className="task-card__edit"
          onClick={handleEdit}
          aria-label="Editar tarea"
        >
          ✏️
        </button>
        <button
          className="task-card__delete"
          onClick={handleDelete}
          aria-label="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TaskCard;

import "./TaskCard.css";

function formatDueDate(dateString) {
  if (!dateString) return null;

  const due = new Date(dateString);

  const dueYear = due.getUTCFullYear();
  const dueMonth = due.getUTCMonth();
  const dueDay = due.getUTCDate();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowYear = tomorrowDate.getFullYear();
  const tomorrowMonth = tomorrowDate.getMonth();
  const tomorrowDay = tomorrowDate.getDate();

  const isToday =
    dueYear === todayYear && dueMonth === todayMonth && dueDay === todayDay;
  const isTomorrow =
    dueYear === tomorrowYear &&
    dueMonth === tomorrowMonth &&
    dueDay === tomorrowDay;

  const dueNum = dueYear * 10000 + (dueMonth + 1) * 100 + dueDay;
  const todayNum = todayYear * 10000 + (todayMonth + 1) * 100 + todayDay;
  const isOverdue = dueNum < todayNum;

  let label = due.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  if (isToday) label = "Hoy";
  else if (isTomorrow) label = "Mañana";
  else if (isOverdue) label = `Vencida (${label})`;

  return { label, isOverdue, isToday, isTomorrow };
}

function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
  isSelected,
  onSelectToggle,
}) {
  const handleToggle = () => onToggle(task._id, !task.isCompleted);
  const handleDelete = () => onDelete(task._id);
  const handleEdit = () => onEdit(task);
  const handleSelect = () => onSelectToggle(task._id);

  const dueInfo = formatDueDate(task.dueDate);

  const dueClassName = [
    "task-card__due",
    dueInfo?.isOverdue && !task.isCompleted && "task-card__due_overdue",
    dueInfo?.isToday && "task-card__due_today",
    dueInfo?.isTomorrow && "task-card__due_tomorrow",
  ]
    .filter(Boolean)
    .join(" ");

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
          {dueInfo && <span className={dueClassName}>📅 {dueInfo.label}</span>}
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

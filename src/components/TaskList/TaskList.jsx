import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.css";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="task-list__empty">
        No tienes tareas aún. ¡Crea la primera!
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;

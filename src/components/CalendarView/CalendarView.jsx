import { useState } from "react";
import "./CalendarView.css";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function CalendarView({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevDays = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    prevDays.push({
      day: prevMonthLastDay - i,
      isOtherMonth: true,
    });
  }

  const currentDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentDays.push({
      day: i,
      isOtherMonth: false,
    });
  }

  const totalCells = prevDays.length + currentDays.length;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  const nextDays = [];
  for (let i = 1; i <= remainingCells; i++) {
    nextDays.push({
      day: i,
      isOtherMonth: true,
    });
  }

  const allDays = [...prevDays, ...currentDays, ...nextDays];

  const tasksByDay = {};
  tasks.forEach((task) => {
    if (!task.dueDate) return;
    const due = new Date(task.dueDate);
    if (due.getFullYear() === year && due.getMonth() === month) {
      const day = due.getDate();
      if (!tasksByDay[day]) tasksByDay[day] = [];
      tasksByDay[day].push(task);
    }
  });

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const today = new Date();
  const isToday = (day) =>
    !day.isOtherMonth &&
    day.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button
          className="calendar__nav-button"
          onClick={goToPrevMonth}
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <h3 className="calendar__title">
          {MONTHS[month]} {year}
        </h3>
        <button
          className="calendar__nav-button"
          onClick={goToNextMonth}
          aria-label="Mes siguiente"
        >
          ›
        </button>
        <button className="calendar__today-button" onClick={goToToday}>
          Hoy
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__grid">
        {allDays.map((day, index) => {
          const dayTasks = !day.isOtherMonth ? tasksByDay[day.day] || [] : [];

          return (
            <div
              key={index}
              className={`calendar__day ${
                day.isOtherMonth ? "calendar__day_other-month" : ""
              } ${isToday(day) ? "calendar__day_today" : ""} ${
                dayTasks.length > 0 ? "calendar__day_has-tasks" : ""
              }`}
            >
              <span className="calendar__day-number">{day.day}</span>
              {dayTasks.length > 0 && (
                <div className="calendar__tasks">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task._id}
                      className={`calendar__task ${
                        task.isCompleted ? "calendar__task_completed" : ""
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="calendar__task-more">
                      +{dayTasks.length - 2} más
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;

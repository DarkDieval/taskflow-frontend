import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header/Header";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import TaskEditForm from "./components/TaskEditForm/TaskEditForm";
import SelectionToolbar from "./components/SelectionToolbar/SelectionToolbar";
import CurrentUserContext from "./contexts/CurrentUserContext";
import heroImage from "./assets/hero.png";
import {
  login,
  getCurrentUser,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
} from "./utils/MainApi";
import CalendarView from "./components/CalendarView/CalendarView";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(
    () => !!localStorage.getItem("token"),
  );
  const [toast, setToast] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setCurrentUser(user);
          return getTasks(token);
        })
        .then((tasksData) => setTasks(tasksData))
        .catch(() => {
          localStorage.removeItem("token");
          setCurrentUser(null);
          setTasks([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleLoginClick = () => {
    setAuthError("");
    setIsLoginModalOpen(true);
  };
  const handleRegisterClick = () => {
    setAuthError("");
    setIsRegisterModalOpen(true);
  };
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsEditModalOpen(false);
    setTaskToEdit(null);
    setAuthError("");
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        showToast(`¡Bienvenido, ${user.name}! 👋`);
        return getTasks(token);
      })
      .then((tasksData) => {
        setTasks(tasksData);
        closeModals();
      })
      .catch((err) => setAuthError(err.message));
  };

  const handleRegister = (email, password) => {
    login(email, password)
      .then((data) => handleLogin(data.token))
      .catch((err) => setAuthError(err.message));
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setTasks([]);
    setSelectedIds([]);
  };

  const handleCreateTask = (taskData) => {
    const token = localStorage.getItem("token");
    createTask(token, taskData)
      .then((newTask) => {
        setTasks([newTask, ...tasks]);
        showToast("Tarea creada ✨");
      })
      .catch((err) => console.error(err));
  };

  const handleToggleTask = (taskId, isCompleted) => {
    const token = localStorage.getItem("token");
    updateTask(token, taskId, { isCompleted })
      .then((updated) =>
        setTasks(tasks.map((t) => (t._id === taskId ? updated : t))),
      )
      .catch((err) => console.error(err));
  };

  const handleDeleteTask = (taskId) => {
    const token = localStorage.getItem("token");
    deleteTask(token, taskId)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== taskId));
        setSelectedIds(selectedIds.filter((id) => id !== taskId));
        showToast("Tarea eliminada 🗑️");
      })
      .catch((err) => console.error(err));
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (taskId, taskData) => {
    const token = localStorage.getItem("token");
    updateTask(token, taskId, taskData)
      .then((updated) => {
        setTasks(tasks.map((t) => (t._id === taskId ? updated : t)));
        closeModals();
        showToast("Tarea actualizada ✏️");
      })
      .catch((err) => console.error(err));
  };

  const handleSelectToggle = (taskId) => {
    setSelectedIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    const token = localStorage.getItem("token");

    deleteManyTasks(token, selectedIds)
      .then((data) => {
        setTasks(tasks.filter((t) => !selectedIds.includes(t._id)));
        showToast(`${data.deletedCount} tarea(s) eliminada(s) 🗑️`);
        setSelectedIds([]);
      })
      .catch((err) => console.error(err));
  };

  const switchToRegister = () => {
    setAuthError("");
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setAuthError("");
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleSignOut }}>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}
        <Header onLogin={handleLoginClick} onRegister={handleRegisterClick} />

        <main className="app__content">
          {isLoading ? (
            <p className="app__loading">Cargando...</p>
          ) : currentUser ? (
            <>
              <h2>Hola, {currentUser.name} 👋</h2>
              <TaskForm onCreateTask={handleCreateTask} />
              <div className="view-toggle">
                <button
                  className={`view-toggle__button ${
                    viewMode === "list" ? "view-toggle__button_active" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  📋 Lista
                </button>
                <button
                  className={`view-toggle__button ${
                    viewMode === "calendar" ? "view-toggle__button_active" : ""
                  }`}
                  onClick={() => setViewMode("calendar")}
                >
                  📅 Calendario
                </button>
              </div>
              {viewMode === "list" ? (
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditClick}
                  selectedIds={selectedIds}
                  onSelectToggle={handleSelectToggle}
                />
              ) : (
                <CalendarView tasks={tasks} />
              )}
            </>
          ) : (
            <section className="hero">
              <div className="hero__text">
                <h2 className="hero__title">Organiza tu día con TaskFlow</h2>
                <p className="hero__subtitle">
                  Crea, ordena y completa tus tareas desde cualquier lugar.
                  Simple, rápido y solo tuyo.
                </p>
                <div className="hero__actions">
                  <button
                    className="hero__cta hero__cta_primary"
                    onClick={handleRegisterClick}
                  >
                    Crear cuenta gratis
                  </button>
                  <button
                    className="hero__cta hero__cta_secondary"
                    onClick={handleLoginClick}
                  >
                    Ya tengo cuenta
                  </button>
                </div>
              </div>
              <img
                src={heroImage}
                alt="Vista previa de la aplicación TaskFlow"
                className="hero__image"
              />
            </section>
          )}
        </main>

        <ModalWithForm
          isOpen={isLoginModalOpen}
          onClose={closeModals}
          title="Iniciar sesión"
        >
          <Login
            onLogin={handleLogin}
            onError={setAuthError}
            onSwitchToRegister={switchToRegister}
          />
          {authError && <p className="modal__error">{authError}</p>}
        </ModalWithForm>

        <ModalWithForm
          isOpen={isRegisterModalOpen}
          onClose={closeModals}
          title="Registrarse"
        >
          <Register
            onRegister={handleRegister}
            onError={setAuthError}
            onSwitchToLogin={switchToLogin}
          />
          {authError && <p className="modal__error">{authError}</p>}
        </ModalWithForm>

        <ModalWithForm
          isOpen={isEditModalOpen}
          onClose={closeModals}
          title="Editar tarea"
        >
          {taskToEdit && (
            <TaskEditForm task={taskToEdit} onSave={handleSaveEdit} />
          )}
        </ModalWithForm>

        <SelectionToolbar
          count={selectedIds.length}
          onClear={handleClearSelection}
          onDeleteSelected={handleDeleteSelected}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

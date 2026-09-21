import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header/Header";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import CurrentUserContext from "./contexts/CurrentUserContext";
import heroImage from "./assets/hero.png";
import {
  login,
  getCurrentUser,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./utils/MainApi";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
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
    setAuthError("");
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setToast(`¡Bienvenido, ${user.name}! 👋`);
        setTimeout(() => setToast(""), 3000);
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
  };

  // CRUD de tareas
  const handleCreateTask = (taskData) => {
    const token = localStorage.getItem("token");
    createTask(token, taskData)
      .then((newTask) => setTasks([newTask, ...tasks]))
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
      .then(() => setTasks(tasks.filter((t) => t._id !== taskId)))
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
              <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

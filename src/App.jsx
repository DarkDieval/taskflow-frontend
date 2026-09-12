import React, { useState } from "react";
import Header from "./components/Header/Header";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleRegisterClick = () => setIsRegisterModalOpen(true);
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="app">
      <Header onLogin={handleLoginClick} onRegister={handleRegisterClick} />

      <main className="app__content">
        <h2>Bienvenido a TaskFlow</h2>
        <p>Aquí irán tus tareas</p>
      </main>

      <ModalWithForm
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        title="Iniciar sesión"
      >
        <Login />
      </ModalWithForm>

      <ModalWithForm
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        title="Registrarse"
      >
        <Register />
      </ModalWithForm>
    </div>
  );
}

export default App;

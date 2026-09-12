import React, { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "El correo es obligatorio";
    if (!emailRegex.test(value)) return "Formato de correo inválido";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "La contraseña es obligatoria";
    if (value.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";
    return "";
  };

  const validateName = (value) => {
    if (!value) return "El nombre es obligatorio";
    if (value.length < 2) return "El nombre debe tener al menos 2 caracteres";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      emailError ||
      passwordError ||
      nameError ||
      !email ||
      !password ||
      !name
    )
      return;
    alert("Registrando usuario... (Aquí irá la conexión al backend)");
  };

  const isFormValid =
    !emailError && !passwordError && !nameError && email && password && name;

  return (
    <>
      <label className="modal__label">
        Correo electrónico
        <input
          className="modal__input"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>
      <label className="modal__label">
        Contraseña
        <input
          className="modal__input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <span className="modal__error">{passwordError}</span>}
      </label>
      <label className="modal__label">
        Nombre de usuario
        <input
          className="modal__input"
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={handleNameChange}
          required
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <p className="modal__redirect">
        ¿Ya tienes cuenta?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Inicia sesión
        </a>
      </p>
      <button
        type="submit"
        className={`modal__submit-button ${!isFormValid ? "modal__submit-button_disabled" : ""}`}
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Registrarse
      </button>
    </>
  );
}

export default Register;

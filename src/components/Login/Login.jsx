import React, { useState } from "react";
import { login } from "../../utils/MainApi";

function Login({ onLogin, onError, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || passwordError || !email || !password) return;

    setIsLoading(true);
    login(email, password)
      .then((data) => {
        onLogin(data.token);
      })
      .catch((err) => {
        onError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const isFormValid = !emailError && !passwordError && email && password;

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
      <p className="modal__redirect">
        ¿No tienes cuenta?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToRegister();
          }}
        >
          Regístrate
        </a>
      </p>
      <button
        type="submit"
        className={`modal__submit-button ${!isFormValid ? "modal__submit-button_disabled" : ""}`}
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Iniciar sesión
      </button>
    </>
  );
}

export default Login;

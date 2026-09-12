import React from "react";
import "./Header.css";

function Header({ onLogin, onRegister }) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">TaskFlow</h1>
        <nav className="header__nav">
          <button className="header__button" onClick={onRegister}>
            Registrarse
          </button>
          <button
            className="header__button header__button_type_login"
            onClick={onLogin}
          >
            Iniciar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

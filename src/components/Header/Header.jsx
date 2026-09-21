import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({ onLogin, onRegister }) {
  const { currentUser, handleSignOut } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">TaskFlow</h1>
        <nav className="header__nav">
          {currentUser ? (
            <>
              <span className="header__username">Hola, {currentUser.name}</span>
              <button
                className="header__button header__button_type_logout"
                onClick={handleSignOut}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button className="header__button" onClick={onRegister}>
                Registrarse
              </button>
              <button
                className="header__button header__button_type_login"
                onClick={onLogin}
              >
                Iniciar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

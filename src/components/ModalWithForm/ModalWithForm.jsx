import React, { useEffect, useRef } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, title, children }) {
  const modalRef = useRef();

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal" ref={modalRef} onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close-button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">{children}</form>
      </div>
    </div>
  );
}

export default ModalWithForm;

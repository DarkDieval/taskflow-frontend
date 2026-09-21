# TaskFlow - Frontend

Aplicación full stack de gestión de tareas. Los usuarios pueden registrarse, iniciar sesión y gestionar sus propias tareas (crear, leer, actualizar y eliminar).

## 🔗 Demo en vivo

- **Aplicación:** [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
- **API Backend:** [https://taskflow-backend-tpgr.onrender.com](https://taskflow-backend-tpgr.onrender.com)

> **Nota:** Para probar la app, primero regístrate con un email y contraseña. Cada usuario ve solo sus propias tareas.

## 🚀 Tecnologías

- **React 19** + **Vite**
- **React Router** (navegación)
- **Context API** (estado global del usuario)
- **JWT** (autenticación con `localStorage`)
- **CSS con BEM** (convención de nombres)
- **ESLint + Airbnb** (calidad de código)

## 📁 Estructura del proyecto
src/
├── components/ (Header, ModalWithForm, Login, Register, TaskForm, TaskCard, TaskList)
├── contexts/ (CurrentUserContext)
├── utils/ (MainApi.js - llamadas al backend)
└── App.jsx (componente raíz)

text

## 🛠️ Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DarkDieval/taskflow-frontend.git
Instala dependencias (usa --legacy-peer-deps por conflicto de ESLint):

bash
npm install --legacy-peer-deps
Arranca el servidor de desarrollo:

bash
npm run dev
Abre http://localhost:5173

🔐 Seguridad aplicada
JWT almacenado en localStorage y validado contra el servidor.

Rutas protegidas: la app solo muestra tareas a usuarios autenticados.

Aislamiento entre usuarios: el backend verifica el owner antes de modificar/eliminar.

👤 Autor
Diego Valencia (@DarkDieval)
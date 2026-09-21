# TaskFlow · Frontend

Aplicación full stack de gestión de tareas. Los usuarios pueden registrarse, iniciar sesión y gestionar sus propias tareas (crear, leer, actualizar y eliminar).

## 🔗 Demo en vivo

- **Aplicación:** [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
- **API backend:** [https://taskflow-backend-tpgr.onrender.com](https://taskflow-backend-tpgr.onrender.com)
- **Repositorio del backend:** [taskflow-backend](https://github.com/DarkDieval/taskflow-backend)

### 🚀 Cómo probar el demo

1. Abre la URL: [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
2. Haz clic en **"Registrarse"** y crea una cuenta con tu email y una contraseña (mínimo 6 caracteres).
3. Inicia sesión y empieza a crear tus tareas.

> **Nota:** cada usuario ve **solo sus propias tareas**. Los datos se guardan en MongoDB Atlas en la nube.
>
> **Nota técnica:** el backend gratuito de Render "duerme" tras 15 minutos sin uso. La primera petición puede tardar ~50 segundos en responder; las siguientes son rápidas.

## 🚀 Tecnologías

- **React 19** + **Vite**
- **Context API** (estado global del usuario)
- **JWT** (autenticación, token guardado en `localStorage`)
- **CSS con BEM** (convención de nombres)
- **ESLint + Airbnb** (calidad de código)

## 📁 Estructura del proyecto

```text
src/
├── components/   (Header, ModalWithForm, Login, Register, TaskForm, TaskCard, TaskList)
├── contexts/     (CurrentUserContext)
├── utils/        (MainApi.js — llamadas al backend)
└── App.jsx       (componente raíz)
```

## 🧑‍💻 Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DarkDieval/taskflow-frontend.git
   ```
2. Instala dependencias (usa `--legacy-peer-deps` por un conflicto de peer dependencies con ESLint):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Arranca el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:5173`

## 🔐 Seguridad aplicada

- JWT almacenado en `localStorage` y validado contra el servidor en cada petición protegida.
- Rutas protegidas: la app solo muestra tareas a usuarios autenticados.
- Aislamiento entre usuarios: el backend verifica el `owner` antes de modificar o eliminar cualquier tarea.

## 🔗 Repositorio relacionado

Backend (API): [taskflow-backend](https://github.com/DarkDieval/taskflow-backend)

## 👤 Autor

Diego Valencia ([@DarkDieval](https://github.com/DarkDieval))

# TaskFlow - Frontend

Aplicación full stack de gestión de tareas. Los usuarios pueden registrarse, iniciar sesión y gestionar sus propias tareas (crear, leer, actualizar y eliminar).

## 🔗 Demo en vivo

- **Aplicación:** [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
- **API Backend:** [https://taskflow-backend-tpgr.onrender.com](https://taskflow-backend-tpgr.onrender.com)
- **Repositorio Backend:** [https://github.com/DarkDieval/taskflow-backend](https://github.com/DarkDieval/taskflow-backend)

### 🚀 Cómo probar el demo

> **⚠️ IMPORTANTE:** Para ver el demo es necesario **iniciar sesión con una cuenta de Netlify**. Si abres la URL sin estar logueado, Netlify bloqueará el acceso.
>
> **Credenciales de prueba:** Puedes usar tu cuenta de Netlify o pedir acceso al autor del proyecto (`diegovalencia5180@hotmail.com`).

**Pasos:**

1. Abre la URL: [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
2. Si Netlify pide login, inicia sesión con tu cuenta de Netlify (o pide acceso al autor).
3. Una vez dentro, haz clic en **"Registrarse"** y crea una cuenta con tu email y una contraseña (mínimo 6 caracteres).
4. Inicia sesión y empieza a crear tus tareas.

> **Nota:** Cada usuario ve **solo sus propias tareas**. Los datos se guardan en una base de datos MongoDB Atlas en la nube.
>
> **Nota técnica:** El backend gratuito de Render "duerme" tras 15 minutos sin uso. El primer request puede tardar ~50 segundos en despertar. Los siguientes son rápidos.

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
   ```

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

🔗 Repositorio relacionado
Backend (API): https://github.com/DarkDieval/taskflow-backend

👤 Autor
Diego Valencia (@DarkDieval)

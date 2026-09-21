# 🎯 TaskFlow · Frontend

**Aplicación full stack de gestión de tareas.** Los usuarios pueden registrarse, iniciar sesión y gestionar sus propias tareas.

## ✨ Funcionalidades

- **Autenticación:** registro, inicio de sesión y cierre de sesión con JWT.
- **CRUD completo de tareas:** crear, leer, editar y eliminar.
- **Edición individual:** modal con formulario para modificar título, descripción y estado.
- **Selección múltiple:** marca varias tareas con un clic.
- **Eliminación masiva:** borra todas las tareas seleccionadas con un solo botón.
- **Marcar como completada:** con checkbox personalizado en cada tarea.
- **Notificaciones toast:** feedback visual tras cada acción.
- **Persistencia de sesión:** token en `localStorage` validado contra el servidor.
- **Diseño responsive:** adaptado a móvil, tablet y desktop.

## 🔗 Demo en vivo

- **Aplicación:** https://sparkly-alpaca-e58384.netlify.app/
- **API backend:** https://taskflow-backend-tpgr.onrender.com
- **Repositorio del backend:** https://github.com/DarkDieval/taskflow-backend

## 🚀 Cómo probar el demo

> ⚠️ **IMPORTANTE:** Para ver el demo es necesario **iniciar sesión con una cuenta de Netlify**. Si abres la URL sin estar logueado, Netlify bloqueará el acceso.

**Pasos:**

1. Ve a https://app.netlify.com e inicia sesión (o crea una cuenta gratuita con GitHub).
2. Una vez logueado, abre la URL del demo: https://sparkly-alpaca-e58384.netlify.app/
3. Verás la aplicación. Haz clic en **"Crear cuenta gratis"** y regístrate.
4. Inicia sesión y empieza a crear tareas.
5. Prueba **editar** (✏️), **completar** (✓) y **seleccionar varias tareas** para eliminarlas en masa.

> 📝 **Nota:** cada usuario ve **solo sus propias tareas**. Los datos se guardan en MongoDB Atlas.
>
> ⏱️ **Nota técnica:** el backend gratuito de Render "duerme" tras 15 minutos sin uso. La primera petición puede tardar ~50 segundos.

## 🛠️ Tecnologías

- **React 19** + **Vite**
- **Context API** (estado global del usuario)
- **JWT** (autenticación con `localStorage`)
- **CSS con BEM** (convención de nombres)
- **Google Fonts** (Inter)
- **ESLint + Airbnb** (calidad de código)

## 📁 Estructura del proyecto

src/
components/
Header/ Encabezado con dos estados
Login/ Formulario de inicio de sesión
Register/ Formulario de registro
ModalWithForm/ Modal reutilizable
TaskForm/ Crear tarea
TaskCard/ Tarjeta individual
TaskList/ Lista de tareas
TaskEditForm/ Editar tarea
SelectionToolbar/ Toolbar flotante para eliminar múltiples
contexts/ CurrentUserContext
utils/ MainApi.js (llamadas al backend)
App.jsx Componente raíz

text

## 🧑‍💻 Instalación local

1. Clona el repositorio:
   git clone https://github.com/DarkDieval/taskflow-frontend.git

text

2. Instala dependencias (usa `--legacy-peer-deps` por conflicto con ESLint):
   npm install --legacy-peer-deps

text

3. Arranca el servidor de desarrollo:
   npm run dev

text

4. Abre `http://localhost:5173`

## 🔐 Seguridad aplicada

- **JWT** almacenado en `localStorage` y validado contra el servidor.
- **Rutas protegidas:** solo usuarios autenticados ven sus tareas.
- **Aislamiento entre usuarios:** el backend verifica el `owner` antes de modificar o eliminar.

## 🔗 Repositorio relacionado

- **Backend (API):** https://github.com/DarkDieval/taskflow-backend

## 👤 Autor

**Diego Valencia** ([@DarkDieval](https://github.com/DarkDieval))

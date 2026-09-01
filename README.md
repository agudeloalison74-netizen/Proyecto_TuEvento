# 🎉 TuEvento

TuEvento es una aplicación web para la gestión y reserva de eventos. 
La plataforma permite conectar a clientes con empresas encargadas de organizar eventos, facilitando la consulta de servicios y la solicitud de reservas.

El proyecto está dividido en un Backend desarrollado con FastAPI y un Frontend desarrollado con React y Bootstrap.

# 📁 Estructura del proyecto

Proyecto_TuEvento/
│
├── backend/
│   │
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── ...
│   │
│   ├── venv/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── context/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── styles/
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md


# 💻 Tecnologías utilizadas

*Backend*
Python
FastAPI
SQLAlchemy
PostgreSQL
Pydantic
JWT
Passlib / Bcrypt
Uvicorn

*Frontend*
React
Vite
JavaScript
Bootstrap
CSS

*Herramientas*
Visual Studio Code
Git
GitHub
PostgreSQL
Figma
Jira

#🖥️ Frontend

El frontend de TuEvento está desarrollado utilizando React + Vite.

La estructura está organizada por responsabilidades para facilitar el mantenimiento y crecimiento de la aplicación.

src/assets/

Contiene recursos utilizados por la aplicación, como imágenes, iconos y otros archivos multimedia.

src/components/

Contiene componentes reutilizables de React.

Ejemplos:

Navbar
Footer
Cards
Formularios
Botones
Modales
src/context/

Contiene los Context API utilizados para compartir información entre diferentes componentes de la aplicación.

Por ejemplo:

Usuario autenticado
Sesión
Token JWT
src/pages/

Contiene las páginas principales de la aplicación.

Ejemplos:

Inicio
Login
Registro
Home del cliente
Home de la empresa
Reserva
Detalle del evento
Perfil
src/services/

Contiene las funciones encargadas de comunicarse con el Backend mediante solicitudes HTTP.

Aquí se realizarán las peticiones a la API, por ejemplo:

Registrar usuario
Iniciar sesión
Obtener empresas
Obtener servicios
Crear reserva
Consultar reservas
Cancelar reserva
src/styles/

Contiene los archivos CSS utilizados para personalizar la interfaz.

# 🎯 MVP - Reserva de eventos

El objetivo principal de la primera versión funcional del proyecto es desarrollar el MVP de reserva de eventos.

El flujo principal será:

Cliente
   ↓
Inicia sesión
   ↓
Visualiza empresas
   ↓
Selecciona una empresa
   ↓
Consulta sus servicios
   ↓
Selecciona un servicio
   ↓
Diligencia el formulario de reserva
   ↓
Envía la solicitud
   ↓
Backend procesa la reserva
   ↓
Se guarda la reserva en PostgreSQL
   ↓
Cliente puede consultar el estado de su reserva

# 🔐 Autenticación

El sistema utiliza autenticación mediante JWT (JSON Web Token).

El proceso funciona de la siguiente manera:

Frontend
   ↓
Login
   ↓
Backend
   ↓
Verificación de correo y contraseña
   ↓
Generación del JWT
   ↓
Frontend recibe el token
   ↓
Token almacenado para mantener la sesión

Las rutas que requieren autenticación estarán protegidas mediante el token.

# 🔌 Comunicación Frontend - Backend

El Frontend y el Backend son proyectos independientes, pero se comunican mediante una API REST.

*Backend*

El servidor FastAPI se ejecuta normalmente en:

http://127.0.0.1:8000

La documentación de la API puede consultarse en:

http://127.0.0.1:8000/docs

*Frontend*

El frontend se ejecuta mediante Vite:

npm run dev

Vite mostrará una dirección similar a:

http://localhost:5173

# ⚙️ Instalación del Backend

*Ingresar a la carpeta:*

cd backend

*Crear y activar el entorno virtual:*

python -m venv venv

*En PowerShell:*

.\venv\Scripts\Activate.ps1

*En Git Bash:*

source venv/Scripts/activate

*Instalar las dependencias:*

pip install -r requirements.txt

*Ejecutar el servidor:*

uvicorn main:app --reload

# ⚙️ Instalación del Frontend

*Ingresar a la carpeta:*

cd frontend

*Instalar las dependencias:*

npm install

*Ejecutar el proyecto:*

npm run dev

# 🗄️ Base de datos

TuEvento utiliza PostgreSQL como sistema de gestión de base de datos.

La base de datos contiene las entidades necesarias para administrar:

Usuarios
Roles
Empresas
Categorías
Servicios
Eventos
Reservas
Entre otras entidades relacionadas con el sistema.

El Backend utiliza SQLAlchemy para realizar la comunicación entre la aplicación y PostgreSQL.

# 🔑 Variables de entorno

Las variables sensibles no deben almacenarse directamente en el código fuente.

Backend

El archivo .env contiene las variables necesarias para la conexión con la base de datos y la configuración de seguridad.

Ejemplo:

DATABASE_URL=tu_url_de_conexion
SECRET_KEY=tu_clave_secreta
Frontend

El frontend puede utilizar un archivo .env para almacenar la URL del Backend.

Ejemplo:

VITE_API_URL=http://127.0.0.1:8000
🌳 Organización de ramas

El proyecto se maneja utilizando ramas independientes para cada parte del sistema.

Ejemplo:

main
│
├── Backend
├── database│
└── frontend

También se pueden crear ramas específicas para funcionalidades:


# 👥 Roles del sistema

TuEvento contempla diferentes roles dentro de la plataforma:

**Cliente**

*Puede:*

Registrarse.
Iniciar sesión.
Consultar empresas.
Consultar servicios.
Realizar solicitudes de reserva.
Consultar el estado de sus reservas.
Cancelar o modificar solicitudes según las reglas del sistema.

**Empresa**

*Puede:*

Gestionar su información.
Publicar servicios.
Gestionar solicitudes de eventos.
Consultar reservas.
Actualizar el estado de las solicitudes.

**Administrador**

*Puede:*

Gestionar usuarios.
Gestionar empresas.
Supervisar la información de la plataforma.
Administrar diferentes elementos del sistema.

# 🚀 Estado actual del proyecto

Actualmente se encuentra en desarrollo.

Backend
 Conexión con PostgreSQL
 Modelos
 Rutas de usuarios
 Registro de usuarios
 Login
 Encriptación de contraseñas
 Autenticación JWT
 Listado de usuarios
 Eliminación de usuarios
 Desarrollo completo de reservas
 Integración completa con el Frontend
Frontend
 Configuración inicial con React + Vite
 Estructura de carpetas
 Conexión con API
 Login conectado al Backend
 Registro conectado al Backend
 Manejo de sesión
 Página principal del cliente
 Consulta de empresas
 Consulta de servicios
 Formulario de reserva
 Envío de reserva al Backend
 Consulta del estado de reserva

# 🎯 Objetivo del MVP

El objetivo principal del MVP es permitir que un cliente pueda realizar una reserva de un evento de principio a fin, utilizando una interfaz desarrollada en React y Bootstrap y una API desarrollada con FastAPI conectada a PostgreSQL.

React + Bootstrap
       ↕
     REST API
       ↕
     FastAPI
       ↕
   SQLAlchemy
       ↕
   PostgreSQL

# 📌 Proyecto académico

Proyecto: TuEvento
Programa: Análisis y Desarrollo de Software
Metodología: Scrum
Tecnologías: React, Bootstrap, FastAPI, PostgreSQL

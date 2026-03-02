# Sistema de Gestion Academica - SENATI

Este proyecto es un sistema de gestion para SENATI que permite administrar estudiantes, profesores, cursos, bloques y calificaciones. Fue desarrollado siguiendo patrones de diseño de software para que el codigo sea ordenado y facil de mantener.

## Estructura del Proyecto

El proyecto se divide en tres partes principales:

1.  **Backend**: Hecho con Node.js y Express. Aqui esta toda la logica, las validaciones y la conexion a la base de datos.
2.  **Frontend**: Hecho con HTML y CSS. Es la interfaz que usa el usuario para interactuar con el sistema.
3.  **Base de Datos**: Usa MySQL para guardar toda la informacion de manera permanente.

---

## Tecnologias Usadas

- **Node.js**: Entorno de ejecucion para el servidor.
- **Express**: Framework para crear las rutas de la API de forma rapida.
- **MySQL**: Base de datos relacional.
- **Cors**: Para permitir que el frontend se comunique con el backend sin problemas.
- **Javascript**: Usado tanto en el servidor como en la logica del cliente.

---

## Organizacion de Carpetas (Backend)

- **config/**: Contiene la configuracion de la conexion a la base de datos (db.js).
- **repositories/**: Aqui es donde se hacen las consultas directas (SQL) a la base de datos. Se usa el patron Singleton para que solo haya una instancia de conexion.
- **services/**: Es la capa intermedia. Recibe los datos, los valida y llama al repositorio. Aqui se usa el patron Facade.
- **commands/**: Cada accion de escribir (crear, editar, eliminar) tiene su propia clase aqui. Esto sigue el patron Command.
- **controllers/**: Recibe las peticiones de la web (req) y envia las respuestas (res).
- **routes/**: Define que URL corresponde a cada funcion del controlador.

---

## Como Ejecutar el Proyecto

### 1. Base de Datos
- Abre tu MySQL (XAMPP, MySQL Workbench, etc.).
- Crea una base de datos llamada `estudiantes_senatinos`.
- Ejecuta el script SQL que se encuentra en la carpeta `base de datos/estudiantes_senati.sql`.

### 2. Backend
- Abre una terminal en la carpeta `backend`.
- Instala las librerias necesarias con: `npm install` (si no las tienes).
- Inicia el servidor con: `node app.js`.
- El servidor correra en `http://localhost:3000`.

### 3. Frontend
- Solo tienes que abrir el archivo `index.html` que esta en la carpeta `front` en cualquier navegador.

---

## Funciones Principales

- **Gestion de Estudiantes**: Registro, edicion, eliminacion y busqueda por DNI o nombre.
- **Gestion de Profesores**: Registro de docentes y su especialidad.
- **Gestion de Cursos y Bloques**: Organizacion por carreras y aulas.
- **Registro de Notas**: Permite poner notas a los alumnos y ver su historial completo en un expediente.
- **Validaciones**: El sistema no permite crear DNI repetidos, nombres de bloques iguales o poner dos notas al mismo alumno en el mismo curso.

---

## Patrones de Diseño Aplicados

Para cumplir con la tarea, se aplicaron estos tres patrones:
- **Singleton**: En el repositorio, para no abrir muchas conexiones a la vez.
- **Facade (Fachada)**: En los servicios, para que el controlador no sepa como funciona la base de datos por dentro.
- **Command (Comando)**: Cada operacion importante es un objeto separado, lo que hace el codigo mas limpio.

---

Proyecto desarrollado para la tarea de Patrones de Diseño.

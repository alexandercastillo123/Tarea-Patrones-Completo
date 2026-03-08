# Sistema de Gestion Academica - SHENATI

Este es el proyecto CRUD que se le implemento el el Dashboard con graficos y el historial de actividades orrientado al manejo de gestion de SHENATI xd.

## Componentes del Proyecto

1.  **Backend**: Hecho con Node.js y Express. Aqui esta toda la logica y la conexion a la base de datos.
2.  **Frontend**: Hecho con React y Vite + TailwindCSS. Es la parte visual donde se gestiona todo.
3.  **Base de Datos**: MySQL para guardar toda la info de forma segura.

---

## Como correr el proyecto en otro dispositivo

1. **Clonar el proyecto**.
2. **Instalar dependencias**:
   - Abre una terminal en `backend` y corre: `npm install`
   - Abre otra terminal en `front/SHENATI` y corre: `npm install`
3. **Base de Datos**: Importa el archivo `estudiantes_senati.sql` (esta en la carpeta "base de datos") en tu MySQL.
4. **Ejecutar**:
   - Terminal 1 (Backend): `node app.js`
   - Terminal 2 (Frontend): `npm run dev`

---

## Arquitectura y Patrones (Para el Profe)

El proyecto no es solo codigo suelto, sigue una estructura profesional por capas:

- **Estructura Backend**: Rutas -> Controladores -> Comandos -> Servicios -> Repositorios.
- **Patrones usados**:
    - **Singleton**: Para que solo haya una conexion a la base de datos y no gastar memoria.
    - **Command**: Cada accion (crear, editar, borrar) es un objeto separado, asi es mas facil de probar y no se mezcla todo.
    - **Facade**: El Service centraliza toda la logica para que el Controlador sea sencillo.

---

## Pruebas (Tests)

Se uso TDD con Jest y Supertest. Para correr las pruebas y ver que todo este bien, ve a la carpeta `backend` y pon:
`npm test`

Actualmente hay 66 tests pasando que cubren todos los endpoints de la API.

---

## Graficos y Dashboard

El Dashboard saca la info de `/api/dashboard/stats`. Se usa la libreria Recharts para mostrar de forma visual:
- Alumnos por carrera.
- Cuantos se inscriben por dia.
- El historial de quien hizo que cosa en el sistema.

Entregable - Alexander Peralta Castillo.
// routes/admin.routes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

console.log('--- Cargando Admin Routes ---');
console.log('Ruta /api/carreras registrada');

// Ruta para listar carreras
router.get('/carreras', controller.listarCarreras);

// Rutas para Estudiantes (CRUD completo)
router.post('/estudiantes', controller.crearEstudiante);
router.get('/estudiantes', controller.listarEstudiantes);
router.get('/estudiantes/:id', controller.listarEstudiantes);
router.put('/estudiantes/:id', controller.actualizarEstudiante);
router.delete('/estudiantes/:id', controller.eliminarEstudiante);

// Ruta para registrar nota
router.post('/notas', controller.registrarNota);

// Ruta para registrar nota
router.post('/notas', controller.registrarNota);

// Rutas para Profesores (CRUD completo)
router.post('/profesores', controller.crearProfesor);
router.get('/profesores', controller.listarProfesores);
router.get('/profesores/:id', controller.listarProfesores);
router.put('/profesores/:id', controller.editarProfesor);
router.delete('/profesores/:id', controller.eliminarProfesor);

// Rutas para Cursos (CRUD completo)
router.post('/cursos', controller.crearCurso);
router.get('/cursos', controller.listarCursos);
router.get('/cursos/:id', controller.listarCursos);
router.put('/cursos/:id', controller.editarCurso);
router.delete('/cursos/:id', controller.eliminarCurso);

// Rutas para Bloques (CRUD completo)
router.post('/bloques', controller.crearBloque);
router.get('/bloques', controller.listarBloques);
router.get('/bloques/:id', controller.listarBloques);
router.put('/bloques/:id', controller.editarBloque);
router.delete('/bloques/:id', controller.eliminarBloque);

// Ruta para detalle de estudiante con notas
router.get('/estudiantes/:id/notas', controller.detalleEstudianteNotas);

module.exports = router;
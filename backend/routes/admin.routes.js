const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

// Dashboard
router.get('/dashboard/stats', controller.obtenerEstadisticasDashboard);
router.post('/login', controller.login);

// Rutas para Carreras (CRUD completo)
router.post('/carreras', controller.crearCarrera);
router.get('/carreras', controller.listarCarreras);
router.put('/carreras/:id', controller.editarCarrera);
router.delete('/carreras/:id', controller.eliminarCarrera);

// Ruta pare Cuenta 
router.post('/usuario', controller.crearUsuario);
router.get('/usuario/:id', controller.detalleUsuario);

// Rutas para Estudiantes (CRUD completo)
router.post('/estudiantes', controller.crearEstudiante);
router.get('/estudiantes', controller.listarEstudiantes);
router.put('/estudiantes/:id', controller.editarEstudiante);
router.delete('/estudiantes/:id', controller.eliminarEstudiante);

// Ruta para registrar nota
router.post('/notas', controller.registrarNota);
router.get('/notas', controller.listarNotas);
router.get('/notas/:id', controller.detalleNota);
router.put('/notas/:id', controller.editarNota);
router.delete('/notas/:id', controller.eliminarNota);

// Rutas para Profesores (CRUD completo)
router.post('/profesores', controller.crearProfesor);
router.get('/profesores', controller.listarProfesores);
router.put('/profesores/:id', controller.editarProfesor);
router.delete('/profesores/:id', controller.eliminarProfesor);

// Rutas para Cursos (CRUD completo)
router.post('/cursos', controller.crearCurso);
router.get('/cursos', controller.listarCursos);
router.put('/cursos/:id', controller.editarCurso);
router.delete('/cursos/:id', controller.eliminarCurso);

// Rutas para Bloques (CRUD completo)
router.post('/bloques', controller.crearBloque);
router.get('/bloques', controller.listarBloques);
router.put('/bloques/:id', controller.editarBloque);
router.delete('/bloques/:id', controller.eliminarBloque);

// Ruta para detalle de estudiante con notas
router.get('/estudiantes/:id/notas', controller.detalleEstudianteNotas);

// Ruta para historial de actividades
router.get('/historial', controller.listarHistorial);

module.exports = router;

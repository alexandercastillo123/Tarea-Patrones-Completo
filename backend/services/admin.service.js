const repo = require('../repositories/admin.repository');

class AdminService {
    // Estudiante - Crear
    async crearEstudiante(data) {
        if (!data.nombre_estudiante || !data.dni_estudiante) {
            throw new Error('Nombre y DNI son obligatorios');
        }
        const existe = await repo.checkEstudianteExistente(data.dni_estudiante);
        if (existe) {
            throw new Error('Ya existe un estudiante con este DNI');
        }
        return await repo.crearEstudiante(data);
    }

    // Estudiante - Editar
    async editarEstudiante(id, data) {
        await repo.editarEstudiante(id, data);
    }

    // Estudiante - Eliminar
    async eliminarEstudiante(id) {
        await repo.eliminarEstudiante(id);
    }

    // Estudiante - Listar
    async listarEstudiantes() {
        return await repo.listarEstudiantes();
    }

    // Profesor - Crear
    async crearProfesor(data) {
        if (!data.nombre_profesor || !data.especialidad) {
            throw new Error('Nombre y Especialidad son obligatorios');
        }
        const existe = await repo.checkProfesorExistente(data.nombre_profesor);
        if (existe) {
            throw new Error('Ya existe un profesor con este nombre');
        }
        return await repo.crearProfesor(data.nombre_profesor, data.especialidad);
    }

    // Profesor - Editar
    async editarProfesor(id, data) {
        await repo.editarProfesor(id, data.nombre_profesor, data.especialidad);
    }

    // Profesor - Eliminar
    async eliminarProfesor(id) {
        await repo.eliminarProfesor(id);
    }

    // Profesor - Listar
    async listarProfesores() {
        return await repo.listarProfesores();
    }

    // Curso - Crear
    async crearCurso(data) {
        if (!data.nombre_curso || !data.id_carrera) {
            throw new Error('Nombre del curso y carrera son obligatorios');
        }
        const existe = await repo.checkCursoExistente(data.nombre_curso, data.id_carrera);
        if (existe) {
            throw new Error('Este curso ya está registrado para esta carrera');
        }
        return await repo.crearCurso(data.nombre_curso, data.id_profesor, data.id_carrera);
    }

    // Curso - Editar
    async editarCurso(id, data) {
        await repo.editarCurso(id, data.nombre_curso, data.id_profesor, data.id_carrera);
    }

    // Curso - Eliminar
    async eliminarCurso(id) {
        await repo.eliminarCurso(id);
    }

    // Curso - Listar
    async listarCursos() {
        return await repo.listarCursos();
    }

    // Carrera - Listar
    async listarCarreras() {
        return await repo.listarCarreras();
    }

    // Bloque - Crear
    async crearBloque(data) {
        if (!data.nombre_bloque || !data.id_profesor) {
            throw new Error('Nombre y ID de profesor son obligatorios');
        }
        const existe = await repo.checkBloqueExistente(data.nombre_bloque);
        if (existe) {
            throw new Error('Este nombre de bloque ya existe');
        }
        return await repo.crearBloque(data.nombre_bloque, data.id_profesor);
    }

    // Bloque - Editar
    async editarBloque(id, data) {
        await repo.editarBloque(id, data.nombre_bloque, data.id_profesor);
    }

    // Bloque - Eliminar
    async eliminarBloque(id) {
        await repo.eliminarBloque(id);
    }

    // Bloque - Listar
    async listarBloques() {
        return await repo.listarBloques();
    }

    // Nota - Registrar
    async registrarNota(data) {
        if (!data.id_estudiante || !data.id_curso || !data.nota) {
            throw new Error('Faltan datos obligatorios para la nota');
        }

        const existe = await repo.checkNotaExistente(data.id_estudiante, data.id_curso);
        if (existe) {
            throw new Error('El estudiante ya cuenta con una calificación registrada en este curso');
        }

        return await repo.registrarNota(data.id_estudiante, data.id_curso, data.nota);
    }


    // Estudiante - Detalle con notas
    async detalleEstudianteNotas(id_estudiante) {
        return await repo.detalleEstudianteNotas(id_estudiante);
    }
}

module.exports = new AdminService();
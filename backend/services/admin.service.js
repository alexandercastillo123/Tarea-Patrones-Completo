const repo = require('../repositories/admin.repository');

class AdminService {
    // Estudiante - Crear
    async crearEstudiante(data, usuario) {
        if (!data.nombre_estudiante || !data.dni_estudiante) {
            throw new Error('Nombre y DNI son obligatorios');
        }
        if (data.dni_estudiante.length !== 8) {
            throw new Error('El DNI debe tener 8 dígitos');
        }
        const existe = await repo.verificarEstudianteExistente(data.dni_estudiante);
        if (existe) {
            throw new Error('Ya existe un estudiante con este DNI');
        }

        // Saneamiento de datos: solo campos de la tabla estudiantes
        const cleanData = {
            nombre_estudiante: data.nombre_estudiante,
            apellido_estudiante: data.apellido_estudiante,
            dni_estudiante: data.dni_estudiante,
            id_carrera: data.id_carrera,
            id_bloque: data.id_bloque || null
        };

        return await repo.crearEstudiante(cleanData, usuario);
    }

    // Estudiante - Editar
    async editarEstudiante(id, data, usuario) {
        if (!data.nombre_estudiante || !data.dni_estudiante) {
            throw new Error('Nombre y DNI son obligatorios');
        }
        if (data.dni_estudiante && data.dni_estudiante.length !== 8) {
            throw new Error('El DNI debe tener 8 dígitos');
        }

        // Saneamiento de datos
        const cleanData = {
            nombre_estudiante: data.nombre_estudiante,
            apellido_estudiante: data.apellido_estudiante,
            dni_estudiante: data.dni_estudiante,
            id_carrera: data.id_carrera,
            id_bloque: data.id_bloque || null
        };

        await repo.editarEstudiante(id, cleanData, usuario);
    }

    // Estudiante - Eliminar
    async eliminarEstudiante(id, usuario) {
        await repo.eliminarEstudiante(id, usuario);
    }

    // Profesor - Crear
    async crearProfesor(data, usuario) {
        if (!data.nombre_profesor || !data.especialidad) {
            throw new Error('Nombre y Especialidad son obligatorios');
        }
        const existe = await repo.verificarProfesorExistente(data.nombre_profesor);
        if (existe) {
            throw new Error('Ya existe un profesor con este nombre');
        }
        return await repo.crearProfesor(data.nombre_profesor, data.especialidad, usuario);
    }

    // Profesor - Editar
    async editarProfesor(id, data, usuario) {
        if (!data.nombre_profesor || !data.especialidad) {
            throw new Error('Nombre y Especialidad son obligatorios');
        }
        await repo.editarProfesor(id, data.nombre_profesor, data.especialidad, usuario);
    }

    // Profesor - Eliminar
    async eliminarProfesor(id, usuario) {
        await repo.eliminarProfesor(id, usuario);
    }

    // Profesor - Listar
    async listarProfesores() {
        return await repo.listarProfesores();
    }

    // Carrera - Crear
    async crearCarrera(nombre_carrera, usuario) {
        if (!nombre_carrera) throw new Error('Nombre de carrera es obligatorio');
        return await repo.crearCarrera(nombre_carrera, usuario);
    }

    // Carrera - Editar
    async editarCarrera(id, nombre_carrera, usuario) {
        if (!nombre_carrera) throw new Error('Nombre de carrera es obligatorio');
        await repo.editarCarrera(id, nombre_carrera, usuario);
    }

    // Carrera - Eliminar
    async eliminarCarrera(id, usuario) {
        await repo.eliminarCarrera(id, usuario);
    }

    // Curso - Crear
    async crearCurso(data, usuario) {
        if (!data.nombre_curso || !data.id_carrera) {
            throw new Error('Nombre del curso y carrera son obligatorios');
        }
        const existe = await repo.verificarCursoExistente(data.nombre_curso, data.id_carrera);
        if (existe) {
            throw new Error('Este curso ya está registrado para esta carrera');
        }
        return await repo.crearCurso(data.nombre_curso, data.id_profesor, data.id_carrera, usuario);
    }

    // Curso - Editar
    async editarCurso(id, data, usuario) {
        if (!data.nombre_curso || !data.id_carrera) {
            throw new Error('Nombre del curso y carrera son obligatorios');
        }
        await repo.editarCurso(id, data.nombre_curso, data.id_profesor, data.id_carrera, usuario);
    }

    // Curso - Eliminar
    async eliminarCurso(id, usuario) {
        await repo.eliminarCurso(id, usuario);
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
    async crearBloque(data, usuario) {
        if (!data.nombre_bloque || !data.id_profesor || !data.id_carrera) {
            throw new Error('Nombre, Profesor y Carrera son obligatorios');
        }
        const existe = await repo.verificarBloqueExistente(data.nombre_bloque);
        if (existe) {
            throw new Error('Este nombre de bloque ya existe');
        }
        return await repo.crearBloque(data.nombre_bloque, data.id_profesor, data.id_carrera, usuario);
    }

    // Bloque - Editar
    async editarBloque(id, data, usuario) {
        if (!data.nombre_bloque || !data.id_profesor || !data.id_carrera) {
            throw new Error('Nombre, Profesor y Carrera son obligatorios');
        }
        await repo.editarBloque(id, data.nombre_bloque, data.id_profesor, data.id_carrera, usuario);
    }

    // Bloque - Eliminar
    async eliminarBloque(id, usuario) {
        await repo.eliminarBloque(id, usuario);
    }

    // Bloque - Listar
    async listarBloques() {
        return await repo.listarBloques();
    }

    // Nota - Registrar
    async registrarNota(data, usuario) {
        if (!data.id_estudiante || !data.id_curso || data.nota === undefined) {
            throw new Error('Estudiante, curso y nota son obligatorios');
        }

        const existe = await repo.verificarNotaExistente(data.id_estudiante, data.id_curso);
        if (existe) {
            throw new Error('El estudiante ya cuenta con una calificación registrada en este curso');
        }

        return await repo.registrarNota(data.id_estudiante, data.id_curso, data.nota, usuario);
    }

    // Nota - Editar
    async editarNota(id, data, usuario) {
        if (!data.id_estudiante || !data.id_curso || data.nota === undefined) {
            throw new Error('Estudiante, curso y nota son obligatorios');
        }
        await repo.editarNota(id, data.id_estudiante, data.id_curso, data.nota, usuario);
    }

    // Nota - Eliminar
    async eliminarNota(id, usuario) {
        await repo.eliminarNota(id, usuario);
    }

    // Nota - Listar
    async listarNotas() {
        return await repo.listarNotas();
    }

    // Historial - Listar
    async listarHistorial() {
        return await repo.listarHistorial();
    }

    // Usuario - Crear
    async crearCuenta(data, usuario) {
        if (!data.nombre_usuario || !data.email || !data.pass) {
            throw new Error('porfavor rellene todos los campos');
        }
        const existe = await repo.verificarCuentaExistente(data.email);
        if (existe) {
            throw new Error('Ya existe una cuenta con este correo');
        }
        return await repo.crearCuenta(data.nombre_usuario, data.email, data.pass, usuario);
    }

    // Listados Extras
    async listarEstudiantes() {
        return await repo.listarEstudiantes();
    }

    async detalleUsuario(id) {
        return await repo.obtenerUsuarioPorId(id);
    }

    async detalleEstudianteNotas(id_estudiante) {
        return await repo.detalleEstudianteNotas(id_estudiante);
    }

    async obtenerNotaPorId(id) {
        return await repo.obtenerNotaPorId(id);
    }

    async obtenerUsuarioPorId(id) {
        return await repo.obtenerUsuarioPorId(id);
    }

    async obtenerEstadisticasDashboard() {
        return await repo.obtenerEstadisticasDashboard();
    }

    async login(usuario, pass) {
        return await repo.validarLogin(usuario, pass);
    }
}

module.exports = new AdminService();

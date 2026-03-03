// Commands de Crear
const CrearEstudianteCommand = require('../commands/CrearEstudianteCommand');
const CrearProfesorCommand = require('../commands/CrearProfesorCommand');
const CrearCursoCommand = require('../commands/CrearCursoCommand');
const CrearBloqueCommand = require('../commands/CrearBloqueCommand');

// Commands de Editar
const EditarEstudianteCommand = require('../commands/EditarEstudianteCommand');
const EditarProfesorCommand = require('../commands/EditarProfesorCommand');
const EditarCursoCommand = require('../commands/EditarCursoCommand');
const EditarBloqueCommand = require('../commands/EditarBloqueCommand');

// Commands de Eliminar
const EliminarEstudianteCommand = require('../commands/EliminarEstudianteCommand');
const EliminarProfesorCommand = require('../commands/EliminarProfesorCommand');
const EliminarCursoCommand = require('../commands/EliminarCursoCommand');
const EliminarBloqueCommand = require('../commands/EliminarBloqueCommand');

// Commands de Registrar
const RegistrarNotaCommand = require('../commands/RegistrarNotaCommand');

const adminService = require('../services/admin.service');
const CrearCuentaCommand = require('../commands/CrearUsuarioCommand');

class AdminController {

    async crearEstudiante(req, res) {
        try {
            const command = new CrearEstudianteCommand(req.body);
            const id = await command.execute();
            res.status(201).json({
                success: true,
                id_estudiante: id,
                mensaje: 'Estudiante creado correctamente'
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async actualizarEstudiante(req, res) {
        try {
            const command = new EditarEstudianteCommand(req.params.id, req.body);
            await command.execute();
            res.json({ success: true, mensaje: 'Estudiante actualizado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
    
    async actualizarUsuario(req, res) {
        try {
            const command = new EditarUsuarioCommand(req.params.id, req.body);
            await command.execute();
            res.json({ success: true, mensaje: 'Usuario actualizado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async eliminarEstudiante(req, res) {
        try {
            const command = new EliminarEstudianteCommand(req.params.id);
            await command.execute();
            res.json({ success: true, mensaje: 'Estudiante eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async eliminarUsuario(req, res) {
        try {
            const command = new EliminarUsuarioCommand(req.params.id);
            await command.execute();
            res.json({ success: true, mensaje: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

//// falta culminar aqui la validacion q la cuenta coincide con el correo y todo lo demas
    async validacionUsuario(req, res) {
        try {
            const command = new EliminarUsuarioCommand(req.params.id);
            await command.execute();
            res.json({ success: true, mensaje: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async registrarNota(req, res) {
        try {
            const command = new RegistrarNotaCommand(req.body);
            const idNota = await command.execute();
            res.status(201).json({
                success: true,
                id_nota: idNota,
                mensaje: 'Nota registrada correctamente'
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async listarEstudiantes(req, res) {
        try {
            const estudiantes = await adminService.listarEstudiantes();
            res.json({ success: true, data: estudiantes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async detalleUsuario(req, res) {
        try {
            const usuario = await adminService.detalleUsuario();
            res.json({ success: true, data: usuario });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async detalleEstudianteNotas(req, res) {
        try {
            const estudiantes = await adminService.detalleEstudianteNotas(req.params.id);
            res.json({ success: true, data: estudiantes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async listarProfesores(req, res) {
        try {
            const profesores = await adminService.listarProfesores();
            res.json({ success: true, data: profesores });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async listarCursos(req, res) {
        try {
            const cursos = await adminService.listarCursos();
            res.json({ success: true, data: cursos });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async listarBloques(req, res) {
        try {
            const bloques = await adminService.listarBloques();
            res.json({ success: true, data: bloques });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async listarCarreras(req, res) {
        try {
            console.log('--- API: Listando Carreras ---');
            const carreras = await adminService.listarCarreras();
            res.json({ success: true, data: carreras });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async crearProfesor(req, res) {
        try {
            const command = new CrearProfesorCommand(req.body);
            const id = await command.execute();
            res.status(201).json({
                success: true,
                id_profesor: id,
                mensaje: 'Profesor creado correctamente'
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async crearCurso(req, res) {
        try {
            const command = new CrearCursoCommand(req.body);
            const id = await command.execute();
            res.status(201).json({
                success: true,
                id_curso: id,
                mensaje: 'Curso creado correctamente'
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async crearBloque(req, res) {
        try {
            const command = new CrearBloqueCommand(req.body);
            const id = await command.execute();
            res.status(201).json({
                success: true,
                id_bloque: id,
                mensaje: 'Bloque creado correctamente'
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async editarProfesor(req, res) {
        try {
            const command = new EditarProfesorCommand(req.params.id, req.body);
            await command.execute();
            res.json({ success: true, mensaje: 'Profesor actualizado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async editarCurso(req, res) {
        try {
            const command = new EditarCursoCommand(req.params.id, req.body);
            await command.execute();
            res.json({ success: true, mensaje: 'Curso actualizado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async editarBloque(req, res) {
        try {
            const command = new EditarBloqueCommand(req.params.id, req.body);
            await command.execute();
            res.json({ success: true, mensaje: 'Bloque actualizado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async eliminarProfesor(req, res) {
        try {
            const command = new EliminarProfesorCommand(req.params.id);
            await command.execute();
            res.json({ success: true, mensaje: 'Profesor eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async eliminarCurso(req, res) {
        try {
            const command = new EliminarCursoCommand(req.params.id);
            await command.execute();
            res.json({ success: true, mensaje: 'Curso eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    async eliminarBloque(req, res) {
        try {
            const command = new EliminarBloqueCommand(req.params.id);
            await command.execute();
            res.json({ success: true, mensaje: 'Bloque eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
    
    async crearUsuario(req, res) {
        try {
            const command = new CrearCuentaCommand(req.body);
            const id = await command.execute();
            res.status(201).json({
                success: true,
                id_usuario: id,
                mensaje: 'Cuenta creado correctamente'
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }



}

module.exports = new AdminController();
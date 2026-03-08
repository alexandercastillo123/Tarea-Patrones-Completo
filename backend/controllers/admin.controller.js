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
const EditarNotaCommand = require('../commands/EditarNotaCommand');
const EliminarNotaCommand = require('../commands/EliminarNotaCommand');
const CrearCarreraCommand = require('../commands/CrearCarreraCommand');
const EditarCarreraCommand = require('../commands/EditarCarreraCommand');
const EliminarCarreraCommand = require('../commands/EliminarCarreraCommand');

class AdminController {

    // Obtener usuario de la sesión desde los headers
    obtenerUsuarioLogueado = (req) => {
        return req.headers['x-user-name'] || "Sistema";
    }

    crearEstudiante = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new CrearEstudianteCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarEstudiante = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EditarEstudianteCommand(id, req.body, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarEstudiante = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EliminarEstudianteCommand(req.params.id, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarNota = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EliminarNotaCommand(req.params.id, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarProfesor = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EliminarProfesorCommand(req.params.id, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarCurso = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EliminarCursoCommand(req.params.id, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarBloque = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EliminarBloqueCommand(req.params.id, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarCarrera = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EliminarCarreraCommand(id, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarHistorial = async (req, res) => {
        try {
            const data = await adminService.listarHistorial();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    registrarNota = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new RegistrarNotaCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarEstudiantes = async (req, res) => {
        try {
            const estudiantes = await adminService.listarEstudiantes();
            res.json({ success: true, data: estudiantes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    detalleUsuario = async (req, res) => {
        try {
            const usuario = await adminService.detalleUsuario(req.params.id);
            res.json({ success: true, data: usuario });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    detalleEstudianteNotas = async (req, res) => {
        try {
            const estudiantes = await adminService.detalleEstudianteNotas(req.params.id);
            res.json({ success: true, data: estudiantes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    crearUsuario = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new CrearCuentaCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarProfesores = async (req, res) => {
        try {
            const profesores = await adminService.listarProfesores();
            res.json({ success: true, data: profesores });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarCursos = async (req, res) => {
        try {
            const cursos = await adminService.listarCursos();
            res.json({ success: true, data: cursos });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarBloques = async (req, res) => {
        try {
            const bloques = await adminService.listarBloques();
            res.json({ success: true, data: bloques });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarCarreras = async (req, res) => {
        try {
            const carreras = await adminService.listarCarreras();
            res.json({ success: true, data: carreras });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    crearCarrera = async (req, res) => {
        try {
            const { nombre_carrera } = req.body;
            const user = this.obtenerUsuarioLogueado(req);
            const insertId = await adminService.crearCarrera(nombre_carrera, user);
            res.status(201).json({ success: true, id_carrera: insertId, message: "Carrera creada" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarCarrera = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre_carrera } = req.body;
            const user = this.obtenerUsuarioLogueado(req);
            await adminService.editarCarrera(id, nombre_carrera, user);
            res.json({ success: true, message: "Carrera actualizada" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    eliminarCarrera = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            await adminService.eliminarCarrera(id, user);
            res.json({ success: true, message: "Carrera eliminada" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    listarNotas = async (req, res) => {
        try {
            console.log("Controlador: Iniciando listarNotas...");
            const notas = await adminService.listarNotas();
            console.log(`Controlador: Se obtuvieron ${notas.length} notas.`);
            res.json({ success: true, data: notas });
        } catch (error) {
            console.error("ERROR EN LISTAR NOTAS (Stack):", error.stack);
            res.status(500).json({ success: false, error: error.message, stack: error.stack });
        }
    }

    detalleNota = async (req, res) => {
        try {
            const nota = await adminService.getNotaById(req.params.id);
            res.json({ success: true, data: nota });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarNota = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EditarNotaCommand(id, req.body, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    crearProfesor = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new CrearProfesorCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    crearCurso = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new CrearCursoCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    crearBloque = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new CrearBloqueCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    crearCarrera = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new CrearCarreraCommand(req.body, user);
            const result = await command.execute();
            res.status(201).json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarProfesor = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EditarProfesorCommand(id, req.body, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarCurso = async (req, res) => {
        try {
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EditarCursoCommand(req.params.id, req.body, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarBloque = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EditarBloqueCommand(id, req.body, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    editarCarrera = async (req, res) => {
        try {
            const { id } = req.params;
            const user = this.obtenerUsuarioLogueado(req);
            const command = new EditarCarreraCommand(id, req.body, user);
            const result = await command.execute();
            res.json({ success: true, ...result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    obtenerEstadisticasDashboard = async (req, res) => {
        try {
            const stats = await adminService.obtenerEstadisticasDashboard();
            res.json({ success: true, data: stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    login = async (req, res) => {
        try {
            const { usuario, pass } = req.body;
            const user = await adminService.login(usuario, pass);
            if (user) {
                res.json({ success: true, data: user, mensaje: 'Inicio de sesión correcto' });
            } else {
                res.status(401).json({ success: false, mensaje: 'Usuario o contraseña incorrectos' });
            }
        } catch (error) {
            console.error('ERROR EN CONTROLADOR:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new AdminController();

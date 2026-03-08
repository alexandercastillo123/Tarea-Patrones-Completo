class CrearEstudianteCommand {
    constructor(data, usuario) {
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idNuevo = await service.crearEstudiante(this.data, this.usuario);
        return { id_estudiante: idNuevo, mensaje: 'Estudiante creado correctamente' };
    }
}

module.exports = CrearEstudianteCommand;
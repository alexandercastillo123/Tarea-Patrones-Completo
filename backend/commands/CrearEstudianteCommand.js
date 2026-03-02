class CrearEstudianteCommand {
    constructor(data) {
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idNuevo = await service.crearEstudiante(this.data);
        return { id_estudiante: idNuevo, mensaje: 'Estudiante creado correctamente' };
    }
}

module.exports = CrearEstudianteCommand;
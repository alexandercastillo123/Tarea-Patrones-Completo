class EliminarEstudianteCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarEstudiante(this.id);
        return { mensaje: 'Estudiante eliminado correctamente' };
    }
}

module.exports = EliminarEstudianteCommand;
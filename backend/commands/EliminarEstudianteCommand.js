class EliminarEstudianteCommand {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarEstudiante(this.id, this.usuario);
        return { mensaje: 'Estudiante eliminado correctamente' };
    }
}

module.exports = EliminarEstudianteCommand;
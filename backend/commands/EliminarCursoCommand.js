class EliminarCursoCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarCurso(this.id);
        return { mensaje: 'Curso eliminado correctamente' };
    }
}

module.exports = EliminarCursoCommand;
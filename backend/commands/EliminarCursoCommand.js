class EliminarCursoCommand {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarCurso(this.id, this.usuario);
        return { mensaje: 'Curso eliminado correctamente' };
    }
}

module.exports = EliminarCursoCommand;
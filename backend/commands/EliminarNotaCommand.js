class EliminarNotaCommand {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarNota(this.id, this.usuario);
        return { success: true, mensaje: 'Nota eliminada correctamente' };
    }
}

module.exports = EliminarNotaCommand;

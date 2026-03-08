class EditarNotaCommand {
    constructor(id, data, usuario) {
        this.id = id;
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarNota(this.id, this.data, this.usuario);
        return { success: true, mensaje: 'Nota actualizada correctamente' };
    }
}

module.exports = EditarNotaCommand;

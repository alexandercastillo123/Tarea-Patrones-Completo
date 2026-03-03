class EditarUsuarioCommand {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarUsuario(this.id, this.data);
        return { mensaje: 'Usuario editado correctamente' };
    }
}

module.exports = EditarUsuarioCommand;
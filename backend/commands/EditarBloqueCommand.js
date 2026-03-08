class EditarBloqueCommand {
    constructor(id, data, usuario) {
        this.id = id;
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarBloque(this.id, this.data, this.usuario);
        return { mensaje: 'Bloque editado correctamente' };
    }
}

module.exports = EditarBloqueCommand;
class EditarBloqueCommand {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarBloque(this.id, this.data);
        return { mensaje: 'Bloque editado correctamente' };
    }
}

module.exports = EditarBloqueCommand;
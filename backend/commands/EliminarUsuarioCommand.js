class EliminarUsuarioCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarUsuario(this.id);
        return { mensaje: 'Usuario eliminado correctamente' };
    }
}

module.exports = EliminarUsuarioCommand;
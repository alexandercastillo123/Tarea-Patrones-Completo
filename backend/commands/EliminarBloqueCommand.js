class EliminarBloqueCommand {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarBloque(this.id, this.usuario);
        return { mensaje: 'Bloque eliminado correctamente' };
    }
}

module.exports = EliminarBloqueCommand;
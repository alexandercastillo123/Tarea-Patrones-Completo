class EliminarBloqueCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarBloque(this.id);
        return { mensaje: 'Bloque eliminado correctamente' };
    }
}

module.exports = EliminarBloqueCommand;
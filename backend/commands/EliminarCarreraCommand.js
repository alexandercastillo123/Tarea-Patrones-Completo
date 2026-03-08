class EliminarCarreraCommand {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarCarrera(this.id, this.usuario);
        return { success: true, mensaje: 'Carrera eliminada correctamente' };
    }
}

module.exports = EliminarCarreraCommand;

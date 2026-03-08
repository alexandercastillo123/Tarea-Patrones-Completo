class EliminarProfesorCommand {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarProfesor(this.id, this.usuario);
        return { mensaje: 'Profesor eliminado correctamente' };
    }
}

module.exports = EliminarProfesorCommand;
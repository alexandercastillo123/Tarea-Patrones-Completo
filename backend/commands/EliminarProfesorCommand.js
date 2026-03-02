class EliminarProfesorCommand {
    constructor(id) {
        this.id = id;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.eliminarProfesor(this.id);
        return { mensaje: 'Profesor eliminado correctamente' };
    }
}

module.exports = EliminarProfesorCommand;
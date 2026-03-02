class EditarProfesorCommand {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarProfesor(this.id, this.data);
        return { mensaje: 'Profesor editado correctamente' };
    }
}

module.exports = EditarProfesorCommand;
class EditarEstudianteCommand {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarEstudiante(this.id, this.data);
        return { mensaje: 'Estudiante editado correctamente' };
    }
}

module.exports = EditarEstudianteCommand;
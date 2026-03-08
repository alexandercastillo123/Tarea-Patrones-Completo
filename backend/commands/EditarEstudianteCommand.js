class EditarEstudianteCommand {
    constructor(id, data, usuario) {
        this.id = id;
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarEstudiante(this.id, this.data, this.usuario);
        return { mensaje: 'Estudiante editado correctamente' };
    }
}

module.exports = EditarEstudianteCommand;
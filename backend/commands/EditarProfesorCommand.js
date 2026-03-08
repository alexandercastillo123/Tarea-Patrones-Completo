class EditarProfesorCommand {
    constructor(id, data, usuario) {
        this.id = id;
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarProfesor(this.id, this.data, this.usuario);
        return { mensaje: 'Profesor editado correctamente' };
    }
}

module.exports = EditarProfesorCommand;
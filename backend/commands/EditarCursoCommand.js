class EditarCursoCommand {
    constructor(id, data, usuario) {
        this.id = id;
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarCurso(this.id, this.data, this.usuario);
        return { mensaje: 'Curso editado correctamente' };
    }
}

module.exports = EditarCursoCommand;
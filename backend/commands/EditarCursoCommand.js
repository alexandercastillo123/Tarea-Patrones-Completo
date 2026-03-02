class EditarCursoCommand {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarCurso(this.id, this.data);
        return { mensaje: 'Curso editado correctamente' };
    }
}

module.exports = EditarCursoCommand;
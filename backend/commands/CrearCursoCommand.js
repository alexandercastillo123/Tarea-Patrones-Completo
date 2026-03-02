class CrearCursoCommand {
    constructor(data) {
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idCurso = await service.crearCurso(this.data);
        return { id_curso: idCurso, mensaje: 'Curso creado correctamente' };
    }
}

module.exports = CrearCursoCommand;
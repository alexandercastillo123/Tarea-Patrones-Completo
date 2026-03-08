class CrearCursoCommand {
    constructor(data, usuario) {
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idCurso = await service.crearCurso(this.data, this.usuario);
        return { id_curso: idCurso, mensaje: 'Curso creado correctamente' };
    }
}

module.exports = CrearCursoCommand;
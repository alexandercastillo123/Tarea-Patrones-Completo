class CrearProfesorCommand {
    constructor(data, usuario) {
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idProfesor = await service.crearProfesor(this.data, this.usuario);
        return { id_profesor: idProfesor, mensaje: 'Profesor creado correctamente' };
    }
}

module.exports = CrearProfesorCommand;
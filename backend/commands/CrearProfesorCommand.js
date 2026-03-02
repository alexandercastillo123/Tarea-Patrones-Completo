class CrearProfesorCommand {
    constructor(data) {
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idProfesor = await service.crearProfesor(this.data);
        return { id_profesor: idProfesor, mensaje: 'Profesor creado correctamente' };
    }
}

module.exports = CrearProfesorCommand;
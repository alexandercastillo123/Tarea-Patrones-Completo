class EditarCarreraCommand {
    constructor(id, data, usuario) {
        this.id = id;
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        await service.editarCarrera(this.id, this.data.nombre_carrera, this.usuario);
        return { success: true, mensaje: 'Carrera actualizada correctamente' };
    }
}

module.exports = EditarCarreraCommand;

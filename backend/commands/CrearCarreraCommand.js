class CrearCarreraCommand {
    constructor(data, usuario) {
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idNuevo = await service.crearCarrera(this.data.nombre_carrera, this.usuario);
        return { id_carrera: idNuevo, mensaje: 'Carrera creada correctamente' };
    }
}

module.exports = CrearCarreraCommand;

class CrearBloqueCommand {
    constructor(data, usuario) {
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idBloque = await service.crearBloque(this.data, this.usuario);
        return { id_bloque: idBloque, mensaje: 'Bloque creado correctamente' };
    }
}

module.exports = CrearBloqueCommand;
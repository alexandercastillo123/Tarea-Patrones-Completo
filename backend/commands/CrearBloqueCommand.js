class CrearBloqueCommand {
    constructor(data) {
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idBloque = await service.crearBloque(this.data);
        return { id_bloque: idBloque, mensaje: 'Bloque creado correctamente' };
    }
}

module.exports = CrearBloqueCommand;
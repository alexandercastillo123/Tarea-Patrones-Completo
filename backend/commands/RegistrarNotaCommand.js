class RegistrarNotaCommand {
    constructor(data, usuario) {
        this.data = data;
        this.usuario = usuario;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idNota = await service.registrarNota(this.data, this.usuario);
        return { id_nota: idNota, mensaje: 'Nota registrada correctamente' };
    }
}

module.exports = RegistrarNotaCommand;
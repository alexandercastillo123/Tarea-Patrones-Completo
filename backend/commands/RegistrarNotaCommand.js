class RegistrarNotaCommand {
    constructor(data) {
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idNota = await service.registrarNota(this.data);
        return { id_nota: idNota, mensaje: 'Nota registrada correctamente' };
    }
}

module.exports = RegistrarNotaCommand;
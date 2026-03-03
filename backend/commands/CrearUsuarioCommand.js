class CrearCuentaCommand {
    constructor(data) {
        this.data = data;
    }

    async execute() {
        const service = require('../services/admin.service');
        const idCuenta = await service.crearCuenta(this.data);
        return { id_cuenta: idCuenta, mensaje: 'Cuenta creada correctamente' };
    }
}

module.exports = CrearCuentaCommand;
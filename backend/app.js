const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', adminRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Backend Gestión Estudiantes - SENATI listo' });
});

if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;
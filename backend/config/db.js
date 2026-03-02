const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'estudiantes_senatinos',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a MySQL correctamenre');
        connection.release();
    } catch (error) {
        console.error('ERROR al conectar a MySQL:', error.message);
        process.exit(1);
    }
})();

module.exports = pool;
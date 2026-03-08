const pool = require('../config/db');

class AdminRepository {
    static instance;

    constructor() {
        if (AdminRepository.instance) {
            return AdminRepository.instance;
        }
        this.pool = pool;
        AdminRepository.instance = this;
        console.log('Singleton creado: AdminRepository (única instancia)');
    }

    async registrarActividad(usuario, accion, tabla, detalle, id_referencia) {
        await this.pool.query(
            'INSERT INTO historial_actividades (usuario, accion, tabla_afectada, detalle, id_referencia) VALUES (?, ?, ?, ?, ?)',
            [usuario, accion, tabla, detalle, id_referencia]
        );
    }

    async listarHistorial() {
        const [rows] = await this.pool.query('SELECT * FROM historial_actividades ORDER BY fecha_hora DESC');
        return rows;
    }

    async crearProfesor(nombre, especialidad, usuario) {
        const [result] = await this.pool.query(
            'INSERT INTO profesores (nombre_profesor, especialidad, usuario_grabacion) VALUES (?, ?, ?)',
            [nombre, especialidad, usuario]
        );
        await this.registrarActividad(usuario, 'Creación', 'Profesores', `Se creó el profesor: ${nombre}`, result.insertId);
        return result.insertId;
    }

    async crearCuenta(nombre_usuario, email, pass, usuario) {
        const [result] = await this.pool.query(
            'INSERT INTO login_usuario (nombre_usuario, email, pass, usuario_grabacion) VALUES (?, ?, ?, ?)',
            [nombre_usuario, email, pass, usuario || 'Sistema']
        );
        await this.registrarActividad(usuario || 'Sistema', 'Creación', 'Usuarios', `Se registró el usuario: ${nombre_usuario}`, result.insertId);
        return result.insertId;
    }

    async editarProfesor(id, nombre, especialidad, usuario) {
        const [result] = await this.pool.query(
            'UPDATE profesores SET nombre_profesor = ?, especialidad = ?, usuario_grabacion = ? WHERE id_profesor = ?',
            [nombre, especialidad, usuario, id]
        );
        await this.registrarActividad(usuario, 'Edición', 'Profesores', `Se editó el profesor ID: ${id}`, id);
        return result.affectedRows;
    }

    async eliminarProfesor(id_profesor, usuario) {
        const [result] = await this.pool.query(
            'DELETE FROM profesores WHERE id_profesor = ?',
            [id_profesor]
        );
        await this.registrarActividad(usuario, 'Eliminación', 'Profesores', `Se eliminó el profesor ID: ${id_profesor}`, id_profesor);
        return result.affectedRows;
    }

    async crearBloque(nombre_bloque, id_profesor, id_carrera, usuario) {
        const [result] = await this.pool.query(
            'INSERT INTO bloques_senatinos (nombre_bloque, id_profesor, id_carrera, usuario_grabacion) VALUES (?, ?, ?, ?)',
            [nombre_bloque, id_profesor, id_carrera, usuario]
        );
        await this.registrarActividad(usuario, 'Creación', 'Bloques', `Se creó el bloque: ${nombre_bloque}`, result.insertId);
        return result.insertId;
    }

    async editarBloque(id_bloque, nombre_bloque, id_profesor, id_carrera, usuario) {
        const [result] = await this.pool.query(
            'UPDATE bloques_senatinos SET nombre_bloque = ?, id_profesor = ?, id_carrera = ?, usuario_grabacion = ? WHERE id_bloque = ?',
            [nombre_bloque, id_profesor, id_carrera, usuario || 'Sistema', id_bloque]
        );
        await this.registrarActividad(usuario || 'Sistema', 'Edición', 'Bloques', `Se editó el bloque ID: ${id_bloque}`, id_bloque);
        return result.affectedRows;
    }

    async eliminarBloque(id_bloque, usuario) {
        const [result] = await this.pool.query(
            'DELETE FROM bloques_senatinos WHERE id_bloque = ?',
            [id_bloque]
        );
        await this.registrarActividad(usuario, 'Eliminación', 'Bloques', `Se eliminó el bloque ID: ${id_bloque}`, id_bloque);
        return result.affectedRows;
    }

    async crearCurso(nombre_curso, id_profesor, id_carrera, usuario) {
        const [result] = await this.pool.query(
            'INSERT INTO cursos (nombre_curso, id_profesor, id_carrera, usuario_grabacion) VALUES (?, ?, ?, ?)',
            [nombre_curso, id_profesor, id_carrera, usuario]
        );
        await this.registrarActividad(usuario, 'Creación', 'Cursos', `Se creó el curso: ${nombre_curso}`, result.insertId);
        return result.insertId;
    }

    async editarCurso(id_curso, nombre_curso, id_profesor, id_carrera, usuario) {
        const [result] = await this.pool.query(
            'UPDATE cursos SET nombre_curso = ?, id_profesor = ?, id_carrera = ?, usuario_grabacion = ? WHERE id_curso = ?',
            [nombre_curso, id_profesor, id_carrera, usuario || 'Sistema', id_curso]
        );
        await this.registrarActividad(usuario || 'Sistema', 'Edición', 'Cursos', `Se editó el curso ID: ${id_curso}`, id_curso);
        return result.affectedRows;
    }

    async eliminarCurso(id_curso, usuario) {
        const [result] = await this.pool.query(
            'DELETE FROM cursos WHERE id_curso = ?',
            [id_curso]
        );
        await this.registrarActividad(usuario, 'Eliminación', 'Cursos', `Se eliminó el curso ID: ${id_curso}`, id_curso);
        return result.affectedRows;
    }

    async crearEstudiante(data, usuario) {
        // Aseguramos que el usuario de grabación esté en el objeto data para el INSERT SET ?
        const studentData = { ...data, usuario_grabacion: usuario || 'Sistema' };
        const [result] = await this.pool.query(
            'INSERT INTO estudiantes SET ?',
            [studentData]
        );
        await this.registrarActividad(usuario || 'Sistema', 'Creación', 'Estudiantes', `Se registró el estudiante: ${data.nombre_estudiante}`, result.insertId);
        return result.insertId;
    }

    async editarEstudiante(id_estudiante, data, usuario) {
        const studentData = { ...data, usuario_grabacion: usuario || 'Sistema' };
        const [result] = await this.pool.query(
            'UPDATE estudiantes SET ? WHERE id_estudiante = ?',
            [studentData, id_estudiante]
        );
        await this.registrarActividad(usuario || 'Sistema', 'Edición', 'Estudiantes', `Se editó el estudiante ID: ${id_estudiante}`, id_estudiante);
        return result.affectedRows;
    }

    async eliminarEstudiante(id_estudiante, usuario) {
        const [result] = await this.pool.query(
            'DELETE FROM estudiantes WHERE id_estudiante = ?',
            [id_estudiante]
        );
        await this.registrarActividad(usuario, 'Eliminación', 'Estudiantes', `Se eliminó el estudiante ID: ${id_estudiante}`, id_estudiante);
        return result.affectedRows;
    }

    async registrarNota(id_estudiante, id_curso, nota, usuario) {
        const [result] = await this.pool.query(
            'INSERT INTO notas (id_estudiante, id_curso, nota, usuario_grabacion) VALUES (?, ?, ?, ?)',
            [id_estudiante, id_curso, nota, usuario]
        );
        await this.registrarActividad(usuario, 'Creación', 'Notas', `Se registró nota ${nota} para estudiante ID: ${id_estudiante}`, result.insertId);
        return result.insertId;
    }

    async editarNota(id_nota, id_estudiante, id_curso, nota, usuario) {
        const [result] = await this.pool.query(
            'UPDATE notas SET id_estudiante = ?, id_curso = ?, nota = ?, usuario_grabacion = ? WHERE id_nota = ?',
            [id_estudiante, id_curso, nota, usuario, id_nota]
        );
        await this.registrarActividad(usuario, 'Edición', 'Notas', `Se editó nota ID: ${id_nota}`, id_nota);
        return result.affectedRows;
    }

    async eliminarNota(id_nota, usuario) {
        const [result] = await this.pool.query(
            'DELETE FROM notas WHERE id_nota = ?',
            [id_nota]
        );
        await this.registrarActividad(usuario, 'Eliminación', 'Notas', `Se eliminó nota ID: ${id_nota}`, id_nota);
        return result.affectedRows;
    }

    async listarNotas() {
        const [rows] = await this.pool.query('SELECT * FROM notas');
        return rows;
    }

    async detalleEstudianteNotas(id_estudiante) {
        const [rows] = await this.pool.query(`
            SELECT n.*, c.nombre_curso 
            FROM notas n
            JOIN cursos c ON n.id_curso = c.id_curso
            WHERE n.id_estudiante = ?
        `, [id_estudiante]);
        return rows;
    }

    async verificarNotaExistente(id_estudiante, id_curso) {
        const [rows] = await this.pool.query(
            'SELECT id_nota FROM notas WHERE id_estudiante = ? AND id_curso = ?',
            [id_estudiante, id_curso]
        );
        return rows.length > 0;
    }

    async verificarBloqueExistente(nombre_bloque) {
        const [rows] = await this.pool.query(
            'SELECT id_bloque FROM bloques_senatinos WHERE nombre_bloque = ?',
            [nombre_bloque]
        );
        return rows.length > 0;
    }

    async verificarCursoExistente(nombre_curso, id_carrera) {
        const [rows] = await this.pool.query(
            'SELECT id_curso FROM cursos WHERE nombre_curso = ? AND id_carrera = ?',
            [nombre_curso, id_carrera]
        );
        return rows.length > 0;
    }

    async listarEstudiantes() {
        const [rows] = await this.pool.query(`
            SELECT e.*, b.nombre_bloque, c.nombre_carrera 
            FROM estudiantes e
            LEFT JOIN bloques_senatinos b ON e.id_bloque = b.id_bloque
            LEFT JOIN carreras_senati c ON e.id_carrera = c.id_carrera
        `);
        return rows;
    }

    async listarProfesores() {
        const [rows] = await this.pool.query('SELECT * FROM profesores');
        return rows;
    }

    async listarCursos() {
        const [rows] = await this.pool.query(`
            SELECT c.*, p.nombre_profesor, ca.nombre_carrera 
            FROM cursos c
            LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
            LEFT JOIN carreras_senati ca ON c.id_carrera = ca.id_carrera
        `);
        return rows;
    }

    async listarBloques() {
        const [rows] = await this.pool.query(`
            SELECT b.*, p.nombre_profesor, ca.nombre_carrera 
            FROM bloques_senatinos b
            LEFT JOIN profesores p ON b.id_profesor = p.id_profesor
            LEFT JOIN carreras_senati ca ON b.id_carrera = ca.id_carrera
        `);
        return rows;
    }

    async crearCarrera(nombre_carrera, usuario) {
        const [result] = await this.pool.query(
            'INSERT INTO carreras_senati (nombre_carrera, usuario_grabacion) VALUES (?, ?)',
            [nombre_carrera, usuario]
        );
        await this.registrarActividad(usuario, 'Creación', 'Carreras', `Se creó la carrera: ${nombre_carrera}`, result.insertId);
        return result.insertId;
    }

    async editarCarrera(id_carrera, nombre_carrera, usuario) {
        const [result] = await this.pool.query(
            'UPDATE carreras_senati SET nombre_carrera = ?, usuario_grabacion = ? WHERE id_carrera = ?',
            [nombre_carrera, usuario || 'Sistema', id_carrera]
        );
        await this.registrarActividad(usuario || 'Sistema', 'Edición', 'Carreras', `Se editó la carrera ID: ${id_carrera}`, id_carrera);
        return result.affectedRows;
    }

    async eliminarCarrera(id_carrera, usuario) {
        const [result] = await this.pool.query(
            'DELETE FROM carreras_senati WHERE id_carrera = ?',
            [id_carrera]
        );
        await this.registrarActividad(usuario, 'Eliminación', 'Carreras', `Se eliminó la carrera ID: ${id_carrera}`, id_carrera);
        return result.affectedRows;
    }

    async listarCarreras() {
        const [rows] = await this.pool.query('SELECT * FROM carreras_senati');
        return rows;
    }

    async obtenerUsuarioPorId(id) {
        const [rows] = await this.pool.query('SELECT * FROM login_usuario WHERE id_usuario = ?', [id]);
        return rows[0];
    }

    async obtenerNotaPorId(id) {
        const [rows] = await this.pool.query('SELECT * FROM notas WHERE id_nota = ?', [id]);
        return rows[0];
    }

    async verificarEstudianteExistente(dni) {
        const [rows] = await this.pool.query('SELECT id_estudiante FROM estudiantes WHERE dni_estudiante = ?', [dni]);
        return rows.length > 0;
    }

    async verificarProfesorExistente(nombre) {
        const [rows] = await this.pool.query('SELECT id_profesor FROM profesores WHERE nombre_profesor = ?', [nombre]);
        return rows.length > 0;
    }

    async verificarCuentaExistente(email) {
        const [rows] = await this.pool.query('SELECT id_usuario FROM login_usuario WHERE email = ?', [email]);
        return rows.length > 0;
    }

    async obtenerEstadisticasDashboard() {
        const [[{ total_est }]] = await this.pool.query('SELECT COUNT(*) as total_est FROM estudiantes');
        const [[{ total_prof }]] = await this.pool.query('SELECT COUNT(*) as total_prof FROM profesores');
        const [[{ total_cur }]] = await this.pool.query('SELECT COUNT(*) as total_cur FROM cursos');
        const [[{ total_not }]] = await this.pool.query('SELECT COUNT(*) as total_not FROM notas');

        const [careerDist] = await this.pool.query(`
            SELECT c.nombre_carrera as name, COUNT(e.id_estudiante) as value
            FROM carreras_senati c
            LEFT JOIN estudiantes e ON c.id_carrera = e.id_carrera
            GROUP BY c.id_carrera, c.nombre_carrera
            ORDER BY value DESC
            LIMIT 5
        `);

        const top3Careers = careerDist.slice(0, 3).map(c => c.name);

        const [registrosSemanalesRaw] = await this.pool.query(`
            SELECT 
                DATE_FORMAT(e.fecha_creacion, '%d %b') as fecha,
                c.nombre_carrera,
                COUNT(*) as cantidad
            FROM estudiantes e
            JOIN carreras_senati c ON e.id_carrera = c.id_carrera
            WHERE e.fecha_creacion >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY fecha, c.nombre_carrera
            ORDER BY e.fecha_creacion ASC
        `);

        const historyMap = {};
        registrosSemanalesRaw.forEach(row => {
            if (!historyMap[row.fecha]) {
                historyMap[row.fecha] = { fecha: row.fecha };
                // Inicializar carrerras en 0
                top3Careers.forEach(cat => historyMap[row.fecha][cat] = 0);
            }
            if (top3Careers.includes(row.nombre_carrera)) {
                historyMap[row.fecha][row.nombre_carrera] = row.cantidad;
            }
        });

        const registrationHistory = Object.values(historyMap);

        const [rowsRegistro] = await this.pool.query('SELECT * FROM historial_actividades WHERE accion = "Creación" ORDER BY fecha_hora DESC LIMIT 1');
        const [rowsActualizado] = await this.pool.query('SELECT * FROM historial_actividades WHERE accion = "Edición" ORDER BY fecha_hora DESC LIMIT 1');

        const ultimoRegistro = rowsRegistro[0] || null;
        const ultimoActualizado = rowsActualizado[0] || null;

        return {
            totales: {
                estudiantes: total_est,
                profesores: total_prof,
                cursos: total_cur,
                notas: total_not
            },
            distribucionCarreras: careerDist,
            historialRegistro: registrationHistory,
            topCarreras: top3Careers,
            ultimoRegistro: ultimoRegistro || null,
            ultimoActualizado: ultimoActualizado || null
        };
    }

    async validarLogin(email, pass) {
        const [rows] = await this.pool.query(
            'SELECT id_usuario, nombre_usuario, email FROM login_usuario WHERE (nombre_usuario = ? OR email = ?) AND pass = ?',
            [email, email, pass]
        );
        return rows[0];
    }
}

module.exports = new AdminRepository();

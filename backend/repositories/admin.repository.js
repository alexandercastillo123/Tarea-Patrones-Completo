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

    async crearProfesor(nombre, especialidad) {
        const [result] = await this.pool.query(
            'INSERT INTO profesores (nombre_profesor, especialidad) VALUES (?, ?)',
            [nombre, especialidad]
        );
        return result.insertId;
    }

    //crear cuenta
    async crearCuenta(nombre_usuario, email,pass) {
        const [result] = await this.pool.query(
            'INSERT INTO profesores (nombre_usuario, email, pass) VALUES (?, ?, ?)',
            [nombre_usuario, email, pass]
        );
        return result.insertId;
    }

    async editarProfesor(id_profesor, nombre, especialidad) {
        const [result] = await this.pool.query(
            'UPDATE profesores SET nombre_profesor = ?, especialidad = ? WHERE id_profesor = ?',
            [nombre, especialidad, id_profesor]
        );
        return result.affectedRows;
    }

    async eliminarProfesor(id_profesor) {
        const [result] = await this.pool.query(
            'DELETE FROM profesores WHERE id_profesor = ?',
            [id_profesor]
        );
        return result.affectedRows;
    }

    async listarProfesores() {
        const [rows] = await this.pool.query('SELECT * FROM profesores');
        return rows;
    }

    async checkProfesorExistente(nombre) {
        const [rows] = await this.pool.query(
            'SELECT id_profesor FROM profesores WHERE nombre_profesor = ?',
            [nombre]
        );
        return rows.length > 0;
    }

    // chequear que ya existe la cuenta
    async checkCuentaExsitente(email) {
        const [ rows ] = await this.pool.query(
            'SELECT id_usuario from  login_usuario WHERE email = ?',
            [email]
        );
        return rows.length > 0;
    }

    async crearBloque(nombre_bloque, id_profesor) {
        const [result] = await this.pool.query(
            'INSERT INTO bloques_senatinos (nombre_bloque, id_profesor) VALUES (?, ?)',
            [nombre_bloque, id_profesor]
        );
        return result.insertId;
    }

    async editarBloque(id_bloque, nombre_bloque, id_profesor) {
        const [result] = await this.pool.query(
            'UPDATE bloques_senatinos SET nombre_bloque = ?, id_profesor = ? WHERE id_bloque = ?',
            [nombre_bloque, id_profesor, id_bloque]
        );
        return result.affectedRows;
    }

    async eliminarBloque(id_bloque) {
        const [result] = await this.pool.query(
            'DELETE FROM bloques_senatinos WHERE id_bloque = ?',
            [id_bloque]
        );
        return result.affectedRows;
    }

    async listarBloques() {
        const [rows] = await this.pool.query('SELECT * FROM bloques_senatinos');
        return rows;
    }

    async crearCurso(nombre_curso, id_profesor, id_carrera) {
        const [result] = await this.pool.query(
            'INSERT INTO cursos (nombre_curso, id_profesor, id_carrera) VALUES (?, ?, ?)',
            [nombre_curso, id_profesor, id_carrera]
        );
        return result.insertId;
    }

    async editarCurso(id_curso, nombre_curso, id_profesor, id_carrera) {
        const [result] = await this.pool.query(
            'UPDATE cursos SET nombre_curso = ?, id_profesor = ?, id_carrera = ? WHERE id_curso = ?',
            [nombre_curso, id_profesor, id_carrera, id_curso]
        );
        return result.affectedRows;
    }

    async eliminarCurso(id_curso) {
        const [result] = await this.pool.query(
            'DELETE FROM cursos WHERE id_curso = ?',
            [id_curso]
        );
        return result.affectedRows;
    }

    async listarCursos() {
        const [rows] = await this.pool.query('SELECT * FROM cursos');
        return rows;
    }

    async listarCarreras() {
        const [rows] = await this.pool.query('SELECT * FROM carreras_senati');
        return rows;
    }

    async crearEstudiante(data) {
        const [result] = await this.pool.query(
            'INSERT INTO estudiantes SET ?',
            [data]
        );
        return result.insertId;
    }

    async editarEstudiante(id_estudiante, data) {
        const [result] = await this.pool.query(
            'UPDATE estudiantes SET ? WHERE id_estudiante = ?',
            [data, id_estudiante]
        );
        return result.affectedRows;
    }

    async eliminarEstudiante(id_estudiante) {
        const [result] = await this.pool.query(
            'DELETE FROM estudiantes WHERE id_estudiante = ?',
            [id_estudiante]
        );
        return result.affectedRows;
    }

    async listarEstudiantes() {
        const [rows] = await this.pool.query('SELECT * FROM estudiantes');
        return rows;
    }

    async checkEstudianteExistente(dni) {
        const [rows] = await this.pool.query(
            'SELECT id_estudiante FROM estudiantes WHERE dni_estudiante = ?',
            [dni]
        );
        return rows.length > 0;
    }

    async registrarNota(id_estudiante, id_curso, nota) {
        const [result] = await this.pool.query(
            'INSERT INTO notas (id_estudiante, id_curso, nota) VALUES (?, ?, ?)',
            [id_estudiante, id_curso, nota]
        );
        return result.insertId;
    }

    async editarNota(id_nota, id_estudiante, id_curso, nota) {
        const [result] = await this.pool.query(
            'UPDATE notas SET id_estudiante = ?, id_curso = ?, nota = ? WHERE id_nota = ?',
            [id_estudiante, id_curso, nota, id_nota]
        );
        return result.affectedRows;
    }

    async eliminarNota(id_nota) {
        const [result] = await this.pool.query(
            'DELETE FROM notas WHERE id_nota = ?',
            [id_nota]
        );
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

    async checkNotaExistente(id_estudiante, id_curso) {
        const [rows] = await this.pool.query(
            'SELECT id_nota FROM notas WHERE id_estudiante = ? AND id_curso = ?',
            [id_estudiante, id_curso]
        );
        return rows.length > 0;
    }

    async checkBloqueExistente(nombre_bloque) {
        const [rows] = await this.pool.query(
            'SELECT id_bloque FROM bloques_senatinos WHERE nombre_bloque = ?',
            [nombre_bloque]
        );
        return rows.length > 0;
    }

    async checkCursoExistente(nombre_curso, id_carrera) {
        const [rows] = await this.pool.query(
            'SELECT id_curso FROM cursos WHERE nombre_curso = ? AND id_carrera = ?',
            [nombre_curso, id_carrera]
        );
        return rows.length > 0;
    }
}

module.exports = new AdminRepository();
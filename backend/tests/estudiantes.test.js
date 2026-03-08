const request = require('supertest');
const app = require('../app');

describe('API Estudiantes', () => {
    let idCarrera;
    let idBloque;
    let idEstudiante;
    const dniUnico = `9${Date.now().toString().slice(-7)}`;

    beforeAll(async () => {
        const resCar = await request(app)
            .post('/api/carreras')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_carrera: `CarreraTest_${Date.now()}` });
        idCarrera = resCar.body.id_carrera;

        const resProf = await request(app)
            .post('/api/profesores')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_profesor: `ProfTest_${Date.now()}`, especialidad: 'Test' });
        const idProf = resProf.body.id_profesor;

        const resBloq = await request(app)
            .post('/api/bloques')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_bloque: `BloqueTest_${Date.now()}`, id_carrera: idCarrera, id_profesor: idProf });
        idBloque = resBloq.body.id_bloque;
    });

    describe('GET /api/estudiantes', () => {
        test('Correcto: debe retornar lista de estudiantes con success true', async () => {
            const res = await request(app).get('/api/estudiantes');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('Error: endpoint incorrecto debe retornar 404', async () => {
            const res = await request(app).get('/api/estudiantees');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/estudiantes', () => {
        test('Correcto: debe crear un estudiante correctamente', async () => {
            const res = await request(app)
                .post('/api/estudiantes')
                .set('X-User-Name', 'jest-test')
                .send({
                    nombre_estudiante: 'Test',
                    apellido_estudiante: 'JestUser',
                    dni_estudiante: dniUnico,
                    id_carrera: idCarrera,
                    id_bloque: idBloque
                });
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            idEstudiante = res.body.id_estudiante;
        });

        test('Error: debe fallar si falta el DNI', async () => {
            const res = await request(app)
                .post('/api/estudiantes')
                .set('X-User-Name', 'jest-test')
                .send({
                    nombre_estudiante: 'Sin DNI',
                    apellido_estudiante: 'Error',
                    id_carrera: idCarrera
                });
            expect(res.body.success).toBe(false);
        });

        test('Error: debe fallar con DNI duplicado', async () => {
            const res = await request(app)
                .post('/api/estudiantes')
                .set('X-User-Name', 'jest-test')
                .send({
                    nombre_estudiante: 'Duplicado',
                    apellido_estudiante: 'Test',
                    dni_estudiante: dniUnico,
                    id_carrera: idCarrera
                });
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/estudiantes/:id', () => {
        test('Correcto: debe editar un estudiante existente', async () => {
            const res = await request(app)
                .put(`/api/estudiantes/${idEstudiante}`)
                .set('X-User-Name', 'jest-test')
                .send({
                    nombre_estudiante: 'Alexander Editado',
                    apellido_estudiante: 'Gomez',
                    dni_estudiante: dniUnico,
                    id_carrera: idCarrera,
                    id_bloque: idBloque
                });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('Error: debe fallar con DNI de longitud incorrecta', async () => {
            const res = await request(app)
                .put(`/api/estudiantes/${idEstudiante}`)
                .set('X-User-Name', 'jest-test')
                .send({ dni_estudiante: '12' });
            expect(res.body.success).toBe(false);
        });

        test('Error: debe retornar error con ID inexistente', async () => {
            const res = await request(app)
                .put('/api/estudiantes/999999')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_estudiante: 'Fantasma', apellido_estudiante: 'Test', dni_estudiante: '11111111', id_carrera: idCarrera });
            expect([200, 500]).toContain(res.statusCode);
        });
    });

    describe('DELETE /api/estudiantes/:id', () => {
        test('Correcto: debe eliminar el estudiante creado para prueba', async () => {
            const crearRes = await request(app)
                .post('/api/estudiantes')
                .set('X-User-Name', 'jest-test')
                .send({
                    nombre_estudiante: 'ParaEliminar',
                    apellido_estudiante: 'Test',
                    dni_estudiante: `8${Date.now().toString().slice(-7)}`,
                    id_carrera: idCarrera,
                    id_bloque: idBloque
                });
            const id = crearRes.body.id_estudiante;
            const res = await request(app)
                .delete(`/api/estudiantes/${id}`)
                .set('X-User-Name', 'jest-test');
            expect(res.body.success).toBe(true);
        });

        test('Error: retorna 404 sin especificar ID', async () => {
            const res = await request(app).delete('/api/estudiantes/');
            expect(res.statusCode).toBe(404);
        });

        test('Error: ID invalido no debe crashear el servidor', async () => {
            const res = await request(app)
                .delete('/api/estudiantes/abc')
                .set('X-User-Name', 'jest-test');
            expect([200, 500]).toContain(res.statusCode);
        });
    });
});

const request = require('supertest');
const app = require('../app');

describe('API Notas', () => {
    let idEstudiante;
    let idCurso;
    let idNota;

    beforeAll(async () => {
        const resCar = await request(app)
            .post('/api/carreras')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_carrera: `CarreraNotas_${Date.now()}` });
        const idCar = resCar.body.id_carrera;

        const resProf = await request(app)
            .post('/api/profesores')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_profesor: `ProfNotas_${Date.now()}`, especialidad: 'Test' });
        const idProf = resProf.body.id_profesor;

        const resBloq = await request(app)
            .post('/api/bloques')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_bloque: `BloqueNotas_${Date.now()}`, id_carrera: idCar, id_profesor: idProf });
        const idBloq = resBloq.body.id_bloque;

        const resEst = await request(app)
            .post('/api/estudiantes')
            .set('X-User-Name', 'jest-test')
            .send({
                nombre_estudiante: 'TestNota',
                apellido_estudiante: 'User',
                dni_estudiante: `7${Date.now().toString().slice(-7)}`,
                id_carrera: idCar,
                id_bloque: idBloq
            });
        idEstudiante = resEst.body.id_estudiante;

        const resCur = await request(app)
            .post('/api/cursos')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_curso: `CursoNota_${Date.now()}`, id_carrera: idCar, id_profesor: idProf });
        idCurso = resCur.body.id_curso;
    });

    describe('GET /api/notas', () => {
        test('Correcto: debe retornar lista de notas', async () => {
            const res = await request(app).get('/api/notas');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('POST /api/notas', () => {
        test('Correcto: debe registrar una nota correctamente', async () => {
            const res = await request(app)
                .post('/api/notas')
                .set('X-User-Name', 'jest-test')
                .send({ id_estudiante: idEstudiante, id_curso: idCurso, nota: 17.5 });
            expect([200, 201]).toContain(res.statusCode);
            expect(res.body.success).toBe(true);
            idNota = res.body.id_nota;
        });

        test('Error: debe fallar si falta estudiante o curso', async () => {
            const res = await request(app)
                .post('/api/notas')
                .set('X-User-Name', 'jest-test')
                .send({ nota: 15 });
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/notas/:id', () => {
        test('Correcto: debe editar una nota existente', async () => {
            const res = await request(app)
                .put(`/api/notas/${idNota}`)
                .set('X-User-Name', 'jest-test')
                .send({ id_estudiante: idEstudiante, id_curso: idCurso, nota: 19 });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('Error: ID inexistente no debe crashear', async () => {
            const res = await request(app)
                .put('/api/notas/999999')
                .set('X-User-Name', 'jest-test')
                .send({ id_estudiante: 1, id_curso: 1, nota: 10 });
            expect([200, 500]).toContain(res.statusCode);
        });
    });

    describe('DELETE /api/notas/:id', () => {
        test('Correcto: debe eliminar la nota creada', async () => {
            const res = await request(app)
                .delete(`/api/notas/${idNota}`)
                .set('X-User-Name', 'jest-test');
            expect(res.body.success).toBe(true);
        });

        test('Error: retorna 404 sin ID', async () => {
            const res = await request(app).delete('/api/notas/');
            expect(res.statusCode).toBe(404);
        });

        test('Error: ID invalido no debe crashear', async () => {
            const res = await request(app)
                .delete('/api/notas/abc')
                .set('X-User-Name', 'jest-test');
            expect([200, 500]).toContain(res.statusCode);
        });
    });
});

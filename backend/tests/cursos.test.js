const request = require('supertest');
const app = require('../app');

describe('API Cursos', () => {
    let idCarrera;
    let idProfesor;
    let idCurso;
    const nombreUnico = `CursoTest_${Date.now()}`;

    beforeAll(async () => {
        const resCar = await request(app)
            .post('/api/carreras')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_carrera: `CarreraCurso_${Date.now()}` });
        idCarrera = resCar.body.id_carrera;

        const resProf = await request(app)
            .post('/api/profesores')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_profesor: `ProfCurso_${Date.now()}`, especialidad: 'Test' });
        idProfesor = resProf.body.id_profesor;
    });

    describe('GET /api/cursos', () => {
        test('Correcto: debe retornar lista de cursos', async () => {
            const res = await request(app).get('/api/cursos');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('Error: endpoint incorrecto debe retornar 404', async () => {
            const res = await request(app).get('/api/cursoss');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/cursos', () => {
        test('Correcto: debe crear un curso correctamente', async () => {
            const res = await request(app)
                .post('/api/cursos')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_curso: nombreUnico, id_carrera: idCarrera, id_profesor: idProfesor });
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            idCurso = res.body.id_curso;
        });

        test('Error: debe fallar si falta nombre o carrera', async () => {
            const res = await request(app)
                .post('/api/cursos')
                .set('X-User-Name', 'jest-test')
                .send({ id_profesor: idProfesor });
            expect(res.body.success).toBe(false);
        });

        test('Error: debe fallar con nombre duplicado en la misma carrera', async () => {
            const res = await request(app)
                .post('/api/cursos')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_curso: nombreUnico, id_carrera: idCarrera, id_profesor: idProfesor });
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/cursos/:id', () => {
        test('Correcto: debe editar un curso existente', async () => {
            const res = await request(app)
                .put(`/api/cursos/${idCurso}`)
                .set('X-User-Name', 'jest-test')
                .send({ nombre_curso: `${nombreUnico}_Edit`, id_carrera: idCarrera, id_profesor: idProfesor });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('Error: debe fallar si el body esta vacio', async () => {
            const res = await request(app)
                .put(`/api/cursos/${idCurso}`)
                .set('X-User-Name', 'jest-test')
                .send({});
            expect(res.body.success).toBe(false);
        });

        test('Error: ID inexistente no debe crashear', async () => {
            const res = await request(app)
                .put('/api/cursos/999999')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_curso: 'X', id_carrera: idCarrera, id_profesor: idProfesor });
            expect([200, 500]).toContain(res.statusCode);
        });
    });

    describe('DELETE /api/cursos/:id', () => {
        test('Correcto: debe eliminar el curso creado', async () => {
            const res = await request(app)
                .delete(`/api/cursos/${idCurso}`)
                .set('X-User-Name', 'jest-test');
            expect(res.body.success).toBe(true);
        });

        test('Error: retorna 404 sin ID', async () => {
            const res = await request(app).delete('/api/cursos/');
            expect(res.statusCode).toBe(404);
        });

        test('Error: ID invalido no debe crashear', async () => {
            const res = await request(app)
                .delete('/api/cursos/abc')
                .set('X-User-Name', 'jest-test');
            expect([200, 500]).toContain(res.statusCode);
        });
    });
});

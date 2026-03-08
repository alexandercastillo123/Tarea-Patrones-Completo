const request = require('supertest');
const app = require('../app');

describe('API Bloques', () => {
    let idCarrera;
    let idProfesor;
    let idBloque;
    const nombreUnico = `BloqueTest_${Date.now()}`;

    beforeAll(async () => {
        const resCar = await request(app)
            .post('/api/carreras')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_carrera: `CarreraBloque_${Date.now()}` });
        idCarrera = resCar.body.id_carrera;

        const resProf = await request(app)
            .post('/api/profesores')
            .set('X-User-Name', 'jest-test')
            .send({ nombre_profesor: `ProfBloque_${Date.now()}`, especialidad: 'Test' });
        idProf = resProf.body.id_profesor;
    });

    describe('GET /api/bloques', () => {
        test('Correcto: debe retornar lista de bloques', async () => {
            const res = await request(app).get('/api/bloques');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('Error: endpoint incorrecto debe retornar 404', async () => {
            const res = await request(app).get('/api/bloquess');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/bloques', () => {
        test('Correcto: debe crear un bloque correctamente', async () => {
            const res = await request(app)
                .post('/api/bloques')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_bloque: nombreUnico, id_carrera: idCarrera, id_profesor: idProf });
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            idBloque = res.body.id_bloque;
        });

        test('Error: debe fallar si falta nombre o carrera', async () => {
            const res = await request(app)
                .post('/api/bloques')
                .set('X-User-Name', 'jest-test')
                .send({ id_profesor: idProf });
            expect(res.body.success).toBe(false);
        });

        test('Error: debe fallar con nombre duplicado', async () => {
            const res = await request(app)
                .post('/api/bloques')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_bloque: nombreUnico, id_carrera: idCarrera, id_profesor: idProf });
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/bloques/:id', () => {
        test('Correcto: debe editar un bloque existente', async () => {
            const res = await request(app)
                .put(`/api/bloques/${idBloque}`)
                .set('X-User-Name', 'jest-test')
                .send({ nombre_bloque: `${nombreUnico}_Edit`, id_carrera: idCarrera, id_profesor: idProf });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('Error: debe fallar si el body esta vacio', async () => {
            const res = await request(app)
                .put(`/api/bloques/${idBloque}`)
                .set('X-User-Name', 'jest-test')
                .send({});
            expect(res.body.success).toBe(false);
        });

        test('Error: ID inexistente no debe crashear', async () => {
            const res = await request(app)
                .put('/api/bloques/999999')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_bloque: 'X', id_carrera: idCarrera, id_profesor: idProf });
            expect([200, 500]).toContain(res.statusCode);
        });
    });

    describe('DELETE /api/bloques/:id', () => {
        test('Correcto: debe eliminar el bloque creado', async () => {
            const res = await request(app)
                .delete(`/api/bloques/${idBloque}`)
                .set('X-User-Name', 'jest-test');
            expect(res.body.success).toBe(true);
        });

        test('Error: retorna 404 sin ID', async () => {
            const res = await request(app).delete('/api/bloques/');
            expect(res.statusCode).toBe(404);
        });

        test('Error: ID invalido no debe crashear', async () => {
            const res = await request(app)
                .delete('/api/bloques/abc')
                .set('X-User-Name', 'jest-test');
            expect([200, 500]).toContain(res.statusCode);
        });
    });
});

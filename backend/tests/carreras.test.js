const request = require('supertest');
const app = require('../app');

describe('API Carreras', () => {
    const nombreUnico = `CarreraTest_${Date.now()}`;
    let idCreado = 1;

    describe('GET /api/carreras', () => {
        test('Correcto: debe retornar lista de carreras', async () => {
            const res = await request(app).get('/api/carreras');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('Error: endpoint mal escrito retorna 404', async () => {
            const res = await request(app).get('/api/carreraas');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/carreras', () => {
        test('Correcto: debe crear una carrera correctamente', async () => {
            const res = await request(app)
                .post('/api/carreras')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_carrera: nombreUnico });
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            if (res.body.id_carrera) idCreado = res.body.id_carrera;
        });

        test('Error: debe fallar si falta el nombre', async () => {
            const res = await request(app)
                .post('/api/carreras')
                .set('X-User-Name', 'jest-test')
                .send({});
            expect(res.body.success).toBe(false);
        });

        test('Error: body vacio no debe crashear el servidor', async () => {
            const res = await request(app)
                .post('/api/carreras')
                .set('X-User-Name', 'jest-test')
                .set('Content-Type', 'application/json')
                .send('{}');
            expect([400, 500]).toContain(res.statusCode);
        });
    });

    describe('PUT /api/carreras/:id', () => {
        test('Correcto: debe editar una carrera existente', async () => {
            const res = await request(app)
                .put(`/api/carreras/${idCreado}`)
                .set('X-User-Name', 'jest-test')
                .send({ nombre_carrera: `${nombreUnico}_Editado` });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('Error: debe fallar si falta el nombre', async () => {
            const res = await request(app)
                .put(`/api/carreras/${idCreado}`)
                .set('X-User-Name', 'jest-test')
                .send({ nombre_carrera: '' });
            expect(res.body.success).toBe(false);
        });

        test('Error: ID inexistente no debe crashear', async () => {
            const res = await request(app)
                .put('/api/carreras/999999')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_carrera: 'Fantasma' });
            expect([200, 500]).toContain(res.statusCode);
        });
    });

    describe('DELETE /api/carreras/:id', () => {
        test('Correcto: debe eliminar la carrera creada', async () => {
            const res = await request(app)
                .delete(`/api/carreras/${idCreado}`)
                .set('X-User-Name', 'jest-test');
            expect(res.body.success).toBe(true);
        });

        test('Error: retorna 404 sin ID', async () => {
            const res = await request(app).delete('/api/carreras/');
            expect(res.statusCode).toBe(404);
        });

        test('Error: ID invalido no debe crashear', async () => {
            const res = await request(app)
                .delete('/api/carreras/abc')
                .set('X-User-Name', 'jest-test');
            expect([200, 500]).toContain(res.statusCode);
        });
    });
});

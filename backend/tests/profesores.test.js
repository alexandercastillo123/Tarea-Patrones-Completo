const request = require('supertest');
const app = require('../app');

describe('API Profesores', () => {
    const nombreUnico = `ProfTest_${Date.now()}`;

    describe('GET /api/profesores', () => {
        test('Correcto: debe retornar lista de profesores', async () => {
            const res = await request(app).get('/api/profesores');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('Error: endpoint mal escrito retorna 404', async () => {
            const res = await request(app).get('/api/profesorres');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/profesores', () => {
        test('Correcto: debe crear un profesor correctamente', async () => {
            const res = await request(app)
                .post('/api/profesores')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_profesor: nombreUnico, especialidad: 'Pruebas' });
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
        });

        test('Error: debe fallar si falta el nombre', async () => {
            const res = await request(app)
                .post('/api/profesores')
                .set('X-User-Name', 'jest-test')
                .send({ especialidad: 'Solo especialidad' });
            expect(res.body.success).toBe(false);
        });

        test('Error: debe fallar con nombre duplicado', async () => {
            const res = await request(app)
                .post('/api/profesores')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_profesor: nombreUnico, especialidad: 'Duplicado' });
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/profesores/:id', () => {
        test('Correcto: debe editar un profesor existente', async () => {
            const res = await request(app)
                .put('/api/profesores/1')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_profesor: 'Ing. Omar Ali Editado', especialidad: 'FULL STACK' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('Error: debe fallar si faltan nombre y especialidad', async () => {
            const res = await request(app)
                .put('/api/profesores/1')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_profesor: '', especialidad: '' });
            expect(res.body.success).toBe(false);
        });

        test('Error: ID inexistente no debe crashear', async () => {
            const res = await request(app)
                .put('/api/profesores/999999')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_profesor: 'Fantasma', especialidad: 'Nada' });
            expect([200, 500]).toContain(res.statusCode);
        });
    });

    describe('DELETE /api/profesores/:id', () => {
        test('Correcto: debe eliminar el profesor de prueba', async () => {
            const crearRes = await request(app)
                .post('/api/profesores')
                .set('X-User-Name', 'jest-test')
                .send({ nombre_profesor: `Eliminar_${Date.now()}`, especialidad: 'Test' });
            const id = crearRes.body.id_profesor;
            const res = await request(app)
                .delete(`/api/profesores/${id}`)
                .set('X-User-Name', 'jest-test');
            expect(res.body.success).toBe(true);
        });

        test('Error: retorna 404 sin ID', async () => {
            const res = await request(app).delete('/api/profesores/');
            expect(res.statusCode).toBe(404);
        });

        test('Error: ID invalido no debe crashear', async () => {
            const res = await request(app)
                .delete('/api/profesores/abc')
                .set('X-User-Name', 'jest-test');
            expect([200, 500]).toContain(res.statusCode);
        });
    });
});

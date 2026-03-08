const request = require('supertest');
const app = require('../app');

describe('API Historial', () => {
    describe('GET /api/historial', () => {
        test('Correcto: debe retornar historial', async () => {
            const res = await request(app).get('/api/historial');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('Error: endpoint incorrecto retorna 404', async () => {
            const res = await request(app).get('/api/historiall');
            expect(res.statusCode).toBe(404);
        });

        test('Error: metodo POST no permitido debe retornar 404', async () => {
            const res = await request(app).post('/api/historial').send({});
            expect(res.statusCode).toBe(404);
        });
    });
});

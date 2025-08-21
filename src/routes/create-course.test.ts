import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import { fa } from 'zod/locales';
import { faker } from '@faker-js/faker';



test('Criar um curso com sucesso', async () => {
    await server.ready();
    const response = await request(server.server).post('/courses').set('Content-Type', 'application/json').send({
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        duration: 30
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        courseID: expect.any(String),
    })
})
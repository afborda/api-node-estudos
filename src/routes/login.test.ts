import { test, expect } from 'vitest'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { server } from '../app.ts'
import { makeUser } from '../tests/factories/make-user.ts'


test('POST /sessions - should return 200 for valid credentials', async () => {
    await server.ready()

    const { user, password } = await makeUser()
    const response = await request(server.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({
            email: user.email,
            password: password,
        })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
        message: 'Login realizado com sucesso'
    })
})
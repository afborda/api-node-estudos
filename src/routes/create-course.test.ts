import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';
import { makeCourse } from '../tests/factories/make-course.ts';

test('get courses', async () => {
    await server.ready();

    const title = randomUUID()
    const course = await makeCourse(title)

    const response = await request(server.server).get(`/courses?search=${title}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
        courses: [{
            id: course.id,
            title: title,
            description: expect.any(String),
            enrollments: 0
        }],
        total: 1
    })
})
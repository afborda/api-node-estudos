import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import { makeCourse } from '../tests/factories/make-course.ts';
import { makeUserOnly } from '../tests/factories/make-user.ts';
import jwt from 'jsonwebtoken';

test('get course by id', async () => {
    await server.ready();

    // Create a manager user for authorization
    const user = await makeUserOnly('manager');
    
    // Generate JWT token
    const token = jwt.sign(
        { sub: user.id, role: user.role }, 
        process.env.JWT_SECRET as string
    );

    // Create a course to fetch
    const course = await makeCourse();

    const response = await request(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        course: {
            id: course.id,
            title: course.title,
            description: course.description
        }
    });
});

test('get course by id - course not found', async () => {
    await server.ready();

    // Create a manager user for authorization
    const user = await makeUserOnly('manager');
    
    // Generate JWT token
    const token = jwt.sign(
        { sub: user.id, role: user.role }, 
        process.env.JWT_SECRET as string
    );

    // Use a random UUID that doesn't exist
    const nonExistentId = '123e4567-e89b-12d3-a456-426614174000';

    const response = await request(server.server)
        .get(`/courses/${nonExistentId}`)
        .set('Authorization', token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
        message: 'Curso não encontrado'
    });
});

test('get course by id - unauthorized (no token)', async () => {
    await server.ready();

    // Create a course
    const course = await makeCourse();

    const response = await request(server.server)
        .get(`/courses/${course.id}`);

    expect(response.status).toBe(401);
});

test('get course by id - forbidden (student role)', async () => {
    await server.ready();

    // Create a student user (not manager)
    const user = await makeUserOnly('student');
    
    // Generate JWT token
    const token = jwt.sign(
        { sub: user.id, role: user.role }, 
        process.env.JWT_SECRET as string
    );

    // Create a course
    const course = await makeCourse();

    const response = await request(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token);

    expect(response.status).toBe(403);
});
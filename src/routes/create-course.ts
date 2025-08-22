import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { checkUserRole } from "./hooks/check-role-user.ts";


export const createCourseRoute: FastifyPluginAsync = async (server) => {

    server.post('/courses', {
        preHandler: [
            checkRequestJWT,
            checkUserRole('manager'),
        ],
        schema: {
            tags: ['Courses'],
            summary: 'Create a new course',
            description: 'Essa rota cria um novo curso recebendo um título e uma descrição',
            body: z.object({
                title: z.string().min(3).max(100),
                description: z.string().min(5).max(500)
            }),
            response: {
                201: z.object({
                    courseID: z.string().uuid()
                }).describe('Retorna o ID do curso criado')
            }
        }
    }, async (request, reply) => {

        const { title, description } = request.body as { title: string; description: string }

        const result = await db
            .insert(courses)
            .values({
                description: description,
                title: title
            })
            .returning({ id: courses.id })

        return reply.status(201).send({ courseID: result[0].id })
    })
}






import { FastifyPluginAsync } from 'fastify'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { z } from 'zod'

export const getCoursesRoute: FastifyPluginAsync = async (server) => {
    server.get('/courses',
        {
            schema: {
                tags: ['Courses'],
                summary: 'Get all courses',
                description: 'Essa rota retorna todos os cursos cadastrados',
                response: {
                    200: z.object({
                        courses: z.array(
                            z.object({
                                id: z.uuid(),
                                title: z.string().min(2).max(100),
                                description: z.string().max(500)
                            })
                        )
                    })
                }
            }
        }, async (request, reply) => {

            const result = await db.select({
                id: courses.id,
                title: courses.title,
                description: courses.description
            }).from(courses)

            return reply.status(200).send({ courses: result })
        })
}




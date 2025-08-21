import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { optional, z } from 'zod'
import { like, ilike, asc, SQL, and, eq, count } from 'drizzle-orm'
import { db } from '../database/client.ts'
import { courses, enrollments } from '../database/schema.ts'
import { group } from 'console'


export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses',
        {
            schema: {
                tags: ['Courses'],
                summary: 'Get all courses',
                querystring: z.object({
                    search: z.string().optional(),
                    orderBy: z.enum(['title']).default('title'),
                    page: z.coerce.number().optional().default(1),
                }),
                description: 'Essa rota retorna todos os cursos cadastrados',
                response: {
                    200: z.object({
                        courses: z.array(
                            z.object({
                                id: z.uuid(),
                                title: z.string().min(2).max(100),
                                description: z.string().max(500),
                                enrollments: z.number().min(0)
                            })
                        ),
                        total: z.number()
                    })
                }
            }
        }, async (request, reply) => {

            const { search, orderBy, page } = request.query

            const conditions: SQL[] | undefined = []

            if (search) {
                conditions.push(ilike(courses.title, `%${search}%`))
            }


            const [result, total] = await Promise.all([
                db.select({
                    id: courses.id,
                    title: courses.title,
                    description: courses.description,
                    enrollments: count(enrollments.id)
                }).from(courses)
                    .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
                    .orderBy(asc(courses[orderBy]))
                    .limit(2)
                    .offset((page - 1) * 2)
                    .where(
                        and(...conditions)
                    )
                    .groupBy(courses.id),
                db.$count(courses, and(...conditions))
            ])



            return reply.status(200).send({ courses: result, total })
        })
}




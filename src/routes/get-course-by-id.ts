import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import { eq } from "drizzle-orm"
import { checkRequestJWT } from "./hooks/check-request-jwt.ts"
import { getAuthenticatedUserFromRequest } from "../utils/get-authenticated-user-from-request.ts"
import { checkUserRole } from "./hooks/check-role-user.ts"

export const getCoursesRoutebyId: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses/:id', {
        preHandler: [
            checkRequestJWT,
            checkUserRole('manager'),
        ],
        schema: {
            params: z.object({
                id: z.string().uuid()
            }),
            tags: ['Courses'],
            summary: 'Get course by ID',
            description: 'Essa rota retorna um curso específico pelo ID',
            response: {
                200: z.object({
                    course: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string()
                    })
                }),
                404: z.object({
                    message: z.string()
                }).describe('Retorna mensagem de erro caso o curso não seja encontrado')
            }
        }
    }, async (request, reply) => {

        const user = getAuthenticatedUserFromRequest(request)

        const courseId = request.params.id

        const course = await db
            .select()
            .from(courses)
            .where(eq(courses.id, courseId))

        if (course.length > 0) {
            return reply.status(200).send({ course: course[0] })
        }
        return reply.status(404).send({ message: 'Curso não encontrado' })

    })
}










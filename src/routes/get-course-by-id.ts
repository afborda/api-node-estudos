import { FastifyPluginAsync } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import { eq } from "drizzle-orm"

export const getCoursesRoutebyId: FastifyPluginAsync<any, any, ZodTypeProvider> = async (server) => {
   server.get('/courses/:id',{
    schema:{
        params: z.object({
            id: z.uuid()
        })
    }
}  ,async(request, reply) => {
   
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










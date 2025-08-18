import { FastifyPluginAsync } from 'fastify'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

export const getCoursesRoute: FastifyPluginAsync = async (server) => {
    server.get('/courses', async(request, reply) => {

        const params = request.params

        const result = await db.select().from(courses)

        return reply.status(200).send({ courses: result }) 
    })
}




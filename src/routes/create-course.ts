import fastify, { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";


export const createCourseRoute: FastifyPluginAsync<any, any, ZodTypeProvider> = async (server) => {

    server.post('/courses', {
    schema:{
        body: z.object({
            title: z.string().min(3).max(100),
            description: z.string().min(5).max(500)
        })
    }
} , async (request, reply) => {

const { title, description } = request.body

   const result = await db
   .insert(courses)
   .values({
       description: description,
       title: title
   })
    .returning({ id: courses.id })

   return reply.status(201).send({ courseID : result[0].id })
})
}






//Heitor.Franco6@live.com


import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { db } from "../database/client.ts";
import { courses, users } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { verify } from "argon2";


export const loginRoute: FastifyPluginAsync = async (server) => {

    server.post('/sessions', {
        schema: {
            tags: ['auth'],
            summary: 'Login',
            description: 'Esta rota realiza o login de um usuário',
            body: z.object({
                email: z.email(),
                password: z.string()
            }),
            // response: {
            //     201: z.object({
            //         courseID: z.string().uuid()
            //     }).describe('Retorna o ID do curso criado')
            // }
        }
    }, async (request, reply) => {

        const { email, password } = request.body as { email: string; password: string }

        const result = await db
            .select()
            .from(users)
            .where(eq(users.email, email))

        if (result.length === 0) {
            return reply.status(400).send({ message: 'E-mail ou senha inválidos' })
        }

        const user = result[0]

        const doesPasswordMatch = await verify(user.password, password)

        if (!doesPasswordMatch) {
            return reply.status(400).send({ message: 'E-mail ou senha inválidos' })
        }

        return reply.status(200).send({ message: 'Login realizado com sucesso' })
    })
}
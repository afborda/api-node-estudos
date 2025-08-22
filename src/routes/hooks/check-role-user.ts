import { FastifyReply, FastifyRequest } from "fastify"
import jwt from 'jsonwebtoken'
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request.ts"

type JWTPayload = {
    sub: string
    role: 'student' | 'teacher' | 'manager'
}

export function checkUserRole(role: string) {

    return async function (request: FastifyRequest, reply: FastifyReply) {
        const user = getAuthenticatedUserFromRequest(request)
        if (user.role !== role) {
            return reply.status(403).send({ message: 'Acesso negado. Usuário não possui permissão.' })
        }
    }
}

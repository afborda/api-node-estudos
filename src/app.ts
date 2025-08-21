import fastify from "fastify"
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { createCourseRoute } from "./routes/create-course.ts"
import { getCoursesRoutebyId } from "./routes/get-course-by-id.ts"
import { getCoursesRoute } from "./routes/get-courses.ts"
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        }
    }
}).withTypeProvider<ZodTypeProvider>()



if (process.env.NODE_ENV === 'development') {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Curso API Node.js',
                description: 'API for managing courses',
                version: '1.0.0'
            }
        },
        transform: jsonSchemaTransform,
    })

    server.register(fastifySwaggerUi, {
        routePrefix: '/documentation',

    })

    server.register(scalarAPIReference, {
        routePrefix: '/docs',
    })

}


server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)


server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCoursesRoutebyId)


export { server }
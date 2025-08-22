import { server } from "./app.ts"

async function start() {
    try {
        await server.ready();
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server listening on http://0.0.0.0:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();


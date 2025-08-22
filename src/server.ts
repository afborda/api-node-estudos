import { server } from "./app.ts"

const PORT = parseInt(process.env.PORT as string) || 3000;

async function start() {
    try {
        await server.ready();
        await server.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Server listening on http://0.0.0.0:${PORT}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();


import {defineConfig} from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

// Para Neon DB, SSL é obrigatório
const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials:{
    url: databaseUrl,
  },
  out:'./drizzle',
  schema:'./src/database/schema.ts',
});
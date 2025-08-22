import {drizzle} from 'drizzle-orm/node-postgres'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables')
}

// Para Neon DB, SSL é obrigatório
const databaseUrl = process.env.DATABASE_URL;

export const db = drizzle(databaseUrl)

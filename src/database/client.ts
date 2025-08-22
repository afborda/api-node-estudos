import {drizzle} from 'drizzle-orm/node-postgres'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables')
}

const databaseUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.DATABASE_URL}?sslmode=require`
  : process.env.DATABASE_URL;

export const db = drizzle(databaseUrl)

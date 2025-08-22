import {defineConfig} from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const databaseUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.DATABASE_URL}?sslmode=require`
  : process.env.DATABASE_URL;

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials:{
    url: databaseUrl,
  },
  out:'./drizzle',
  schema:'./src/database/schema.ts',
});
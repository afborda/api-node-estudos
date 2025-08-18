import {defineConfig} from 'drizzle-kit'
import { config } from 'dotenv';

config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials:{
    url: process.env.DATABASE_URL,
  },
  // Remover a configuração do studio para usar padrões
  // studio: {
  //   port: 4983,
  //   host: '127.0.0.1',
  //   verbose: true
  // },
  out:'./drizzle',
  schema:'./src/database/schema.ts',
});
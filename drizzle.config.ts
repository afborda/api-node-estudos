import {defineConfig} from 'drizzle-kit'

// Only load .env in development
if (process.env.NODE_ENV !== 'production') {
  const { config } = await import('dotenv');
  config();
}

if (!process.env.DATABASE_URL) {
  console.error('Available environment variables:', Object.keys(process.env).filter(key => key.includes('DATA')));
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
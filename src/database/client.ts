import {drizzle} from 'drizzle-orm/node-postgres'

let db: any = null;

try {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not defined - database features will be disabled');
  } else {
    db = drizzle(process.env.DATABASE_URL);
    console.log('✅ Database client initialized');
  }
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  db = null;
}

export { db }

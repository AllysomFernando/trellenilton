import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { config } from 'dotenv';
import * as path from 'path';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';

config(); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: path.resolve(__dirname, './drizzle') });
    console.log('Migrations applied successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations().then(() => {
  pool.end();
});
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config();

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export default defineConfig({
  schema: './src/infra/database/models/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: getEnvVariable('PGHOST'),
    database: getEnvVariable('PGDATABASE'),
    user: getEnvVariable('PGUSER'),
    password: getEnvVariable('PGPASSWORD'),
  },
});
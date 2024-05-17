import { createClient } from "@libsql/client";
import { env } from "./env";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from '../infra/database/models'

const client = createClient({ url: env.url, authToken: env.authToken });
export const db = drizzle(client, {
  schema
});
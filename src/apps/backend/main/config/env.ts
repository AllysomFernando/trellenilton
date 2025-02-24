import { z } from "zod";

const envSchema = z.object({
  url: z.string(),
  authToken: z.string(),
})

export const env = envSchema.parse(process.env)
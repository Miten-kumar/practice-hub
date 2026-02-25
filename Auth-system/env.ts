import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.string().default("5432"),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;

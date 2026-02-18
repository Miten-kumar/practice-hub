import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
});

const env = envSchema.parse(process.env);

export default env;
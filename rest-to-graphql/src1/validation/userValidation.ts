// src/validation/userValidation.ts

import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3)
});
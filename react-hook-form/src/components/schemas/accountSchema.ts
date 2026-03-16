import { z } from "zod";

export const AccountSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .trim(),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
    role: z.enum(["user", "admin"], { message: "Select a role" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AccountInfo = z.infer<typeof AccountSchema>;
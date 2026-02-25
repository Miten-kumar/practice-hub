import zod from "zod";

export const registerSchema = zod.object({
  email: zod
    .string()
    .regex(/^[A-Za-z0-9._%+-]+@(aspiresoftserv\.com|gmail\.com)$/, {
      error: "Invalid email format",
    }),
  first_name: zod
    .string()
    .min(3, { error: "First name must be at least 3 characters long" })
    .max(20, {
      error: "First name must be less than 20 characters long",
    }),
  last_name: zod
    .string()
    .min(3, { error: "Last name must be at least 3 characters long" })
    .max(20, { error: "Last name must be less than 20 characters long" }),
  contact_number: zod
    .string()
    .min(10, { error: "Contact number must be at least 10 digits long" }),
  age: zod
    .number()
    .positive()
    .min(12, { error: "Age must be at least 12" })
    .max(75, { error: "Age must be less than 75" }),
  gender: zod.enum(["male", "female", "other"], {
    error: "Gender must be 'male', 'female', or 'other'",
  }),
  password: zod
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      error: "Password must contain at least one special character",
    }),
  confirm_password: zod.string(),
});

export const loginSchema = zod.object({
  email: zod.string({ error: "Email is required" }),
  password: zod.string({ error: "Password is required" }),
});

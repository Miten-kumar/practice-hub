import {z} from "zod"

export interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const PersonalInfoSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .min(3, "At least 3 letters required")
    .trim(),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .min(3, "At least 3 letters required")
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .trim(),

  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
});
import * as z from "zod";

export const createUserSchema = z.object({
  name: z.string("Name is required").min(3, "Must be greater than 3 letters"),
  email: z.email("Invalid email address"),
  contact_no: z.string("Contact No. is required").min(10, "Contact number must be at least 10 digits long"),
});


export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email address").optional(),
  contact_no: z.string().min(10, "Contact number must be at least 10 digits long").optional(),
});

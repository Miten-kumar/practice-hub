import { z } from "zod";

export const AdminFieldsSchema = z.object({
  department: z.string().min(1, "Department is required").trim(),
  access_level: z.enum(["read", "write", "admin"], { message: "Select an access level" }),
});

export const UserFieldsSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, "Select at least one interest"),
  subscriptions: z.enum(["free", "pro", "enterprise"], { message: "Select a plan" }),
});

export type AdminFields = z.infer<typeof AdminFieldsSchema>;
export type UserFields = z.infer<typeof UserFieldsSchema>;
export type DynamicFields = AdminFields | UserFields;
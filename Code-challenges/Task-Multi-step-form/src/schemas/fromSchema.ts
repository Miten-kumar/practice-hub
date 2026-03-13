import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    email: z.string().email(),

    employmentStatus: z.enum(["employed", "unemployed"]),
    companyName: z.string().optional(),

    skills: z.array(z.string()).min(1, "Add at least one skill"),

    resume: z.any()
  })
  .refine(
    (data) =>
      data.employmentStatus !== "employed" || !!data.companyName,
    {
      message: "Company name required",
      path: ["companyName"]
    }
  ); 

export type FormValues = z.infer<typeof formSchema>;

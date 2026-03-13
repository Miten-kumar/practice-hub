import z from "zod";

export const personalInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50)
      .regex(/^[A-Za-z]+$/, "Only letters allowed"),

    lastName: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[A-Za-z]+$/, "Only letters allowed"),

    email: z.string().email("Invalid email format"),

    // phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    age: z.number().min(18).max(60),

    country: z.enum(["India", "USA", "Canada", "UK", "Other"]),

    countryName: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.country === "Other") {
        return data.countryName && data.countryName.length > 0;
      }
      return true;
    },
    {
      message: "Country name is required",
      path: ["countryName"],
    },
  );

export const professionalSchema = z
  .object({
    employmentStatus: z.enum([
      "Student",
      "Employed",
      "Freelancer",
      "Unemployed",
    ]),

    collegeName: z.string().optional(),
    degree: z.string().optional(),
    degreeOther: z.string().optional(),
    graduationYear: z.string().optional(),

    companyName: z.string().optional(),
    jobTitle: z.string().optional(),
    experienceYears: z.string().optional(),
    currentSalary: z.number().optional(),

    freelancerSkill: z.string().optional(),
    freelancingYears: z.string().optional(),
    portfolioWebsite: z.string().url().optional(),

    lastEmployment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.employmentStatus === "Student") {
      if (!data.collegeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "College name required",
          path: ["collegeName"],
        });
      }

      if (!data.degree) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree required",
          path: ["degree"],
        });
      }

      if (!data.graduationYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Graduation year required",
          path: ["graduationYear"],
        });
      }
    }

    if (data.employmentStatus === "Employed") {
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name required",
          path: ["companyName"],
        });
      }

      if (!data.jobTitle) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Job title required",
          path: ["jobTitle"],
        });
      }
    }

    if (data.employmentStatus === "Freelancer") {
      if (!data.freelancerSkill) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Primary skill required",
          path: ["freelancerSkill"],
        });
      }
    }
  });

export const skillsSchema = z
  .object({
    primarySkill: z.enum([
      "Frontend",
      "Backend",
      "Fullstack",
      "DevOps",
      "Data Science",
    ]),

    technicalSkills: z
      .array(z.string().min(1))
      .min(1, "At least one skill required")
      .max(10, "Maximum 10 skills"),

    experience: z.enum(["0-1", "1-2", "2-4", "4-6", "6+"]),

    githubProfile: z.string().url().optional(),

    frontendFramework: z.string().optional(),
    frameworkOther: z.string().optional(),

    backendLanguage: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.primarySkill === "Frontend" && !data.frontendFramework) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Frontend framework required",
        path: ["frontendFramework"],
      });
    }

    if (data.primarySkill === "Backend" && !data.backendLanguage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Backend language required",
        path: ["backendLanguage"],
      });
    }
  });

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const documentSchema = z.object({
  profilePicture: z
    .any()
    .refine((file) => file?.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
      "Only jpg, png allowed",
    ),

  resume: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine((file) => file?.type === "application/pdf", "Resume must be PDF"),

  portfolioFile: z.any().optional(),
});

export const jobApplicationSchema = personalInfoSchema
  .merge(professionalSchema)
  .merge(skillsSchema)
  .merge(documentSchema);

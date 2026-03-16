import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "application/pdf"];

export const FileSchema = z.object({
  files: z
    .custom<FileList>((v) => v instanceof FileList, "Files required")
    .refine((f) => f.length > 0, "At least one file is required")
    .refine(
      (f) => Array.from(f).every((file) => file.size <= MAX_SIZE),
      "Each file must be under 5 MB"
    )
    .refine(
      (f) => Array.from(f).every((file) => ACCEPTED.includes(file.type)),
      "Only JPEG, PNG, and PDF files are allowed"
    ),
});

export type FileUploads = z.infer<typeof FileSchema>;
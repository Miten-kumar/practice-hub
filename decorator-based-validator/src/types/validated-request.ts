import type { Request } from "express";

export type ValidatedRequest<T> = Request & {
  validatedBody: T;
};

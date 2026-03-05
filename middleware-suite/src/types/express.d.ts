import "express";

declare module "express-serve-static-core" {
  interface Response {
    success: (data: any, message?: string) => Response;
    error: (message: string, statusCode?: number,errors?:object) => Response;
  }
}
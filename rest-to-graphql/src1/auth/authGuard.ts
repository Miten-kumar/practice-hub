// src/auth/authGuard.ts

export const requireAuth = (context: any) => {
  if (!context.user) {
    throw new Error("Unauthorized");
  }
};
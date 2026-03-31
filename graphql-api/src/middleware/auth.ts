import type { Request } from "express";

import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req: Request) => {
  const token = req.headers.authorization ?? "";

  return verifyToken(token);
};

// src/auth/auth.ts

import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET";

export const generateToken = (user: any) => {
  return jwt.sign(user, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
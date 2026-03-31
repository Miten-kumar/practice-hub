import jwt from "jsonwebtoken";

type AuthUser = {
  id: string;
  email: string;
  name: string;
};

const SECRET = "SECRET";

export const generateToken = (user: AuthUser) => {
  return jwt.sign(user, SECRET);
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, SECRET) as AuthUser;
  } catch {
    return null;
  }
};

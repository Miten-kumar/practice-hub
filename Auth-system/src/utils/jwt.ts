import jwt from "jsonwebtoken";
import env from "../../env";

interface TokenPayload {
  email: string;
  firstName: string;
  lastName: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "15m" });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

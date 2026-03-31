// src/context/context.ts

import { verifyToken } from "../auth/auth";
import { createPostLoader } from "../loaders/postLoader";

export const createContext = async ({ req }: any) => {
  const token = req.headers.authorization || "";
  const user = verifyToken(token.replace("Bearer ", ""));

  return {
    user,
    loaders: {
      postLoader: createPostLoader()
    }
  };
};
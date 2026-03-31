// src/schema/resolvers.ts

import { userService } from "../services/userService";
import { requireAuth } from "../auth/authGuard";
import { generateToken } from "../auth/auth";
import { createUserSchema } from "../validation/userValidation";

export const resolvers = {
  Query: {
    getUsers: (_: any, { limit, offset }: any, context: any) => {
      requireAuth(context);
      return userService.getUsers(limit, offset);
    },

    getUser: (_: any, { id }: any) => {
      return userService.getUser(id);
    }
  },

  Mutation: {
    createUser: (_: any, { input }: any) => {
      const parsed = createUserSchema.parse(input);
      return userService.createUser(parsed);
    },

    login: (_: any, { input }: any) => {
      const user = userService.getUserByName(input.name);

      if (!user) throw new Error("User not found");

      return {
        token: generateToken(user),
        user
      };
    }
  },

  User: {
    posts: (user: any, _: any, context: any) => {
      return context.loaders.postLoader.load(user.id);
    }
  }
};
// controllers/userController.ts

import { userService } from "../services/userService";
import { generateToken } from "../utils/auth";

export const getUsers = (req: any, res: any) => {
  const { limit = 10, offset = 0 } = req.query;

  const users = userService.getUsers(Number(limit), Number(offset));
  res.json(users);
};

export const getUser = (req: any, res: any) => {
  const user = userService.getUser(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const getUserPosts = (req: any, res: any) => {
  const posts = userService.getUserPosts(req.params.id);
  res.json(posts);
};

export const createUser = (req: any, res: any) => {
  const user = userService.createUser(req.body);
  res.json(user);
};

export const login = (req: any, res: any) => {
  const { name } = req.body;

  const user = userService.getUserByName?.(name);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = generateToken(user);

  res.json({ token, user });
};
// src/services/userService.ts

import { db } from "../db";

export const userService = {
  getUsers: (limit: number, offset: number) =>
    db.getUsersPaginated(limit, offset),

  getUser: (id: string) =>
    db.getUserById(id),

  getUserByName: (name: string) =>
    db.getUserByName(name),

  createUser: (data: any) =>
    db.createUser(data)
};
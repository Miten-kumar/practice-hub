// services/userService.ts

import { db } from "../db/index";

export const userService = {
  getUsers: (limit: number, offset: number) => {
    return db.getUsersPaginated(limit, offset);
  },

  getUser: (id: string) => {
    return db.getUserById(id);
  },

  getUserByName:(name:string)=>{
    return db.getUserByName(name)
  },
  getUserPosts: (userId: string) => {
    return db.getPostsByUserId(userId);
  },

  createUser: (data: any) => {
    return db.createUser(data);
  }
};
// src/loaders/postLoader.ts

import DataLoader from "dataloader";
import { db } from "../db";

export const createPostLoader = () => {
  return new DataLoader(async (userIds: readonly string[]) => {
    const posts = db.getPostsByUserIds(userIds);

    const map: Record<string, any[]> = {};

    posts.forEach(p => {
      if (!map[p.userId]) map[p.userId] = [];
      map[p.userId]!.push(p);
    });

    return userIds.map(id => map[id] || []);
  });
};
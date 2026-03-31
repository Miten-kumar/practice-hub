// src/db/index.ts

export const users = [
  { id: "1", name: "Tejas" },
  { id: "2", name: "Rahul" }
];

export const posts = [
  { id: "101", title: "Post 1", userId: "1" },
  { id: "102", title: "Post 2", userId: "1" },
  { id: "103", title: "Post 3", userId: "2" }
];

export const db = {
  getUsers: () => users,

  getUsersPaginated: (limit: number, offset: number) =>
    users.slice(offset, offset + limit),

  getUserById: (id: string) =>
    users.find(u => u.id === id),

  getUserByName: (name: string) =>
    users.find(u => u.name === name),

  getPostsByUserIds: (userIds: readonly string[]) =>
    posts.filter(p => userIds.includes(p.userId)),

  createUser: (data: any) => {
    const newUser = { id: Date.now().toString(), ...data };
    users.push(newUser);
    return newUser;
  }
};
import { User } from "../types/user";
import { v4 as uuid } from "uuid";

let users: User[] = [];

export class UserRepository {
  findAll(page: number, limit: number) {
    const start = (page - 1) * limit;
    return {
      data: users.slice(start, start + limit),
      total: users.length
    };
  }

  findById(id: string) {
    return users.find(u => u.id === id);
  }

  create(data: Omit<User, "id" | "createdAt">) {
    const user: User = {
      id: uuid(),
      createdAt: new Date(),
      ...data
    };
    users.push(user);
    return user;
  }

  update(id: string, data: Partial<User>) {
    const user = this.findById(id);
    if (!user) return null;

    Object.assign(user, data);
    return user;
  }

  delete(id: string) {
    users = users.filter(u => u.id !== id);
  }
}
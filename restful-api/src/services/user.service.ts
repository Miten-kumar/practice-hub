import { UserRepository } from "../repositories/user.repository";
import { ApiError } from "../utils/errors";

const repo = new UserRepository();

export class UserService {
  getAll(page: number, limit: number) {
    return repo.findAll(page, limit);
  }

  getById(id: string) {
    const user = repo.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  create(data: { name: string; email: string }) {
    return repo.create(data);
  }

  update(id: string, data: any) {
    const user = repo.update(id, data);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  delete(id: string) {
    repo.delete(id);
  }
}
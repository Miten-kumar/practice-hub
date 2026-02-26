import { User } from "../../db/entities/User";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository = new UserRepository();

  async createUser(user: User) {
    if (!user.name || !user.email || !user.mobile_no || !user.password) {
      throw new Error("All fields are required");
    }
    return await this.userRepository.createUser(user);
  }

  async updateUser(id: number, user: User) {
    if (!id) {
      throw new Error("User ID is required");
    }
    return await this.userRepository.updateUser(id, user);
  }
}

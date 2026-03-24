import { User } from "../../db/entities/User";
import { UserRepository } from "../repositories/user.repository";
import { ApiError } from "../utils/apiError";

export class UserService {
  private userRepository: UserRepository = new UserRepository();

  async createUser(user: User) {
    if (!user.name || !user.email || !user.mobile_no || !user.password) {
      throw new ApiError(400, "All fields are required", "VALIDATION_ERROR");
    }

    return await this.userRepository.createUser(user);
  }

  async updateUser(id: number, user: User) {
    if (!id) {
      throw new ApiError(400, "User ID is required", "INVALID_USER_ID");
    }

    return await this.userRepository.updateUser(id, user);
  }
}

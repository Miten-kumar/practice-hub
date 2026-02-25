import { AppDataSource } from "../data-source";
import { IUser } from "../types/User";

export class UserRepository {
  private userRepository = AppDataSource.getRepository("User");
  async createUser(userData: IUser) {
    const user = this.userRepository.create(userData);

    await this.userRepository.save(user);
    return user;
  }

  async getUserCredentials(userData: IUser) {
    const user = this.userRepository.findOne({
      where: { email: userData.email },
      select: ["email", "password", "firstName", "lastName"],
    });

    return user;
  }
}

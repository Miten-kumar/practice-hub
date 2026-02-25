import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../types/User";
import bcrypt from "bcrypt";

export class RegisterService {
  private userRepository: UserRepository = new UserRepository();
  async registerUser(userData: IUser) {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail\.com|aspiresoftserv\.com)$/;
    const PASSWORD_REGEX =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!EMAIL_REGEX.test(userData.email)) {
      console.log("invalid email");
      throw new Error("Invalid email address");
    }
    if (!PASSWORD_REGEX.test(userData.password)) {
      throw new Error("Invalid password");
    }
    if (userData.firstName.length < 3 && userData.lastName.length < 3) {
      throw new Error("Invalid FirstName Or LastName");
    }
    if (userData.password != userData.confirmPassword) {
      throw new Error("password and comfirm password does not match");
    }
    if (userData.age <= 12 || userData.age >= 75) {
      throw new Error("Age must be between 12 and 75");
    }

    const salt = 10;
    const hash_password = await bcrypt.hash(userData.password, salt);
    userData.password = hash_password;
    return this.userRepository.createUser(userData);
  }
}

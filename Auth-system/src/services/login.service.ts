import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../types/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export class LoginService {
  private userRepository: UserRepository = new UserRepository();

  async loginUser(userData: IUser) {
    const credentials = await this.userRepository.getUserCredentials(userData);
    if (!credentials) {
      throw Error("email or password invalid");
    }

    const isValid = await bcrypt.compare(
      userData.password,
      credentials.password,
    );

    if (!isValid) throw Error("email or password invalid");

    const payload = {
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
    };

    const token = generateToken(payload);

    return token;
  }
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserRepository } from "../repositories/UserRepository";

export class AuthService {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = getUserRepository().create({
      email,
      password: hashed,
    });

    return getUserRepository().save(user);
  }

  async login(email: string, password: string) {
    const user = await getUserRepository().findOne({
      where: { email },
    });

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id }, "SECRET", { expiresIn: "1h" });

    return token;
  }
}

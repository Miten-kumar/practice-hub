import { userRepository } from "../repositories/user.repository.js";
import { Users } from "../entity/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export class AuthService {
   
    async registerUser(userData: Partial<Users>) {
        
        const existingUser = await userRepository.findOneBy({ email: userData.email });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(userData.password!, 10);

        const newUser = userRepository.create({
            ...userData,
            password: hashedPassword
        });

        await userRepository.save(newUser);

        const { password: _password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async loginUser(email: string, pass: string) {
      
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "3h"
        });

        return { token, user: { id: user.id, email: user.email, first_name: user.first_name } };
    }
}

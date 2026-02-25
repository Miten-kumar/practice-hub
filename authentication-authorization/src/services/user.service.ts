import { AppDataSource } from "../db/datasource";
import { Users } from "../models/user";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(Users);

  async create(user: Partial<Users>) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
  async findByContact(contact_number: string) {
    return this.userRepository.findOneBy({ contact_number });
  }

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async update(id: string, updateData: Partial<Users>) {
    await this.userRepository.update({ id }, updateData);
    return this.findById(id);
  }

  async delete(id: string) {
    await this.userRepository.delete({ id });
  }
}

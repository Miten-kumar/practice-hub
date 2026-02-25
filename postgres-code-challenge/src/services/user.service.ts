import {UserRepository} from "../repositories/user.repository.js"

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(name: string, email: string) {
    return this.userRepository.create({ name, email } as any);
  }

  async getUserById(user_id: string) {
    return this.userRepository.findById(user_id);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async updateUser(user_id: string, name?: string, email?: string) {
    const updateData: Partial<{ name: string; email: string }> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    return this.userRepository.update(user_id, updateData);
  }

  async deleteUser(user_id: string) {
    await this.userRepository.delete(user_id);
  }
}
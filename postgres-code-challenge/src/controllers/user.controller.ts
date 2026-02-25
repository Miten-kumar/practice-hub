import { UserService } from "../services/user.service.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: any, res: any) {
    try {
      const { name, email } = req.body;
      const user = await this.userService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async getUserById(req: any, res: any) {
    try {
      const { user_id } = req.params;
      const user = await this.userService.getUserById(user_id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  async getAllUsers(req: any, res: any) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }

  async updateUser(req: any, res: any) {
    try {
      const { user_id } = req.params;
      const { name, email } = req.body;
      const updatedUser = await this.userService.updateUser(user_id, name, email);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async deleteUser(req: any, res: any) {
    try {      const { user_id } = req.params;
      await this.userService.deleteUser(user_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

import { pool } from "../db/db.js";
import { type User,type IUserRepository } from "../types/user.js";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const { name, email } = user;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );
    return result.rows[0];
  }

  async findById(user_id: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    return result.rows[0] || null;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  async update(user_id: string, user: Partial<User>): Promise<User | null> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in user) {
      fields.push(`${key} = $${index}`);
      values.push(user[key as keyof User]);
      index++;
    }

    if (fields.length === 0) {
      return this.findById(user_id);
    }

    const query = `UPDATE users SET ${fields.join(", ")} WHERE user_id = $${
      index
    } RETURNING *`;
    values.push(user_id);

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(user_id: string): Promise<void> {
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0] || null;
  }

  async findByContactNo(contact_no: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE contact_no = $1",
      [contact_no],
    );
    return result.rows[0] || null;
  }
}
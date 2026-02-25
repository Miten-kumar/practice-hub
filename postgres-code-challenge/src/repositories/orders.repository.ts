import { pool } from "../db/db.js";
import {type IOrdersRepository,type Orders} from '../types/orders.js'

export class OrdersRepository implements IOrdersRepository {
  async findById(order_id: string): Promise<Orders | null> {
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_id = $1",
      [order_id],
    );
    return result.rows[0] || null;
  }

  async create(
    order: Omit<Orders, "order_id" | "created_at">,
  ): Promise<Orders> {
    const { user_id, product_id, quantity } = order;
    const result = await pool.query(
      "INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity],
    );
    return result.rows[0];
  }

  async delete(order_id: string): Promise<void> {
    await pool.query("DELETE FROM orders WHERE order_id = $1", [
      order_id,
    ]);
  }

  async update(order_id: string, order: Partial<Omit<Orders, "order_id" | "created_at">>): Promise<Orders> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in order) {
      fields.push(`${key} = $${index}`);
      values.push(order[key as keyof Omit<Orders, "order_id" | "created_at">]);
      index++;
    }

    if (fields.length === 0) {
      return this.findById(order_id) as Promise<Orders>;
    }

    const query = `UPDATE orders SET ${fields.join(", ")} WHERE order_id = $${
      index
    } RETURNING *`;
    values.push(order_id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
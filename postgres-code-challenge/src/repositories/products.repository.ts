import { pool } from "../db/db.js";
import { type IProductsRepository, type Products } from "../types/products.js";

export class ProductsRepository implements IProductsRepository {
  async findById(product_id: string): Promise<Products | null> {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id],
    );
    return result.rows[0] || null;
  }

  async create(
    product: Omit<Products, "product_id" | "created_at">,
  ): Promise<Products> {
    const { name, description, price, stock } = product;
    const result = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, stock],
    );
    return result.rows[0];
  }

  async update(
    product_id: string,
    product: Partial<Omit<Products, "product_id" | "created_at">>,
  ): Promise<Products> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in product) {
      fields.push(`${key} = $${index}`);
      values.push(product[key as keyof Omit<Products, "product_id" | "created_at">]);
      index++;
    }

    if (fields.length === 0) {
      return this.findById(product_id) as Promise<Products>;
    }

    const query = `UPDATE products SET ${fields.join(", ")} WHERE product_id = $${
      index
    } RETURNING *`;
    values.push(product_id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(product_id: string): Promise<void> {
    await pool.query("DELETE FROM products WHERE product_id = $1", [
      product_id,
    ]);
  }
}
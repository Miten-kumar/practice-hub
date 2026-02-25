import { pool } from "../db/db.js";
import { type Reviews, type IReviewsRepository} from "../types/reviews.js";

export class ReviewsRepository implements IReviewsRepository {
  async findById(review_id: string): Promise<Reviews | null> {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE review_id = $1",
      [review_id],
    );
    return result.rows[0] || null;
  }

  async create(
    review: Omit<Reviews, "review_id" | "created_at">,
  ): Promise<Reviews> {
    const { user_id, product_id, rating, comment } = review;
    const result = await pool.query(
      "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, product_id, rating, comment],
    );
    return result.rows[0];
  }

  async update(
    review_id: string,
    review: Partial<Omit<Reviews, "review_id" | "created_at">>,
  ): Promise<Reviews> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in review) {
      fields.push(`${key} = $${index}`);
      values.push(review[key as keyof Omit<Reviews, "review_id" | "created_at">]);
      index++;
    }

    if (fields.length === 0) {
      return this.findById(review_id) as Promise<Reviews>;
    }

    const query = `UPDATE reviews SET ${fields.join(", ")} WHERE review_id = $${
      index
    } RETURNING *`;
    values.push(review_id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(review_id: string): Promise<void> {
    await pool.query("DELETE FROM reviews WHERE review_id = $1", [
      review_id,
    ]);
  }
}
import { AppDataSource } from "../config/data-source";
import { Products } from "../entities/Product";

const productRep = AppDataSource.getRepository(Products);

export type Cursor = {
  created_at: Date;
  id: number;
};

export class ProductService {
  async getPaginated(cursor?: Cursor, limit: number = 10) {

    const qb = productRep
      .createQueryBuilder("products")
      .orderBy("products.created_at", "DESC")
      .addOrderBy("products.id", "DESC")
      .limit(limit);

    if (cursor) {
      qb.where(
        `(products.created_at < :created_at 
          OR (products.created_at = :created_at AND products.id < :id))`,
        {
          created_at: new Date(cursor.created_at), // 🔥 FIX
          id: cursor.id,
        },
      );
    }

    const data = await qb.getMany();


    const last = data[data.length - 1];

    return {
      data,
      nextCursor: last
        ? {
            created_at: last.created_at,
            id: last.id,
          }
        : null,
    };
  }
}

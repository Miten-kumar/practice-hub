import { AppDataSource } from "../data-source";
import { Product } from "../entity/Products";

export class ProductRepository {
  async getProducts(cursor?: number, limit = 10) {
    const prodRepo = AppDataSource.getRepository(Product);
    const safeLimit = Number.isFinite(limit)
      ? Math.max(1, Math.min(Math.trunc(limit), 50))
      : 10;

    let query = prodRepo
      .createQueryBuilder("product")
      .orderBy("product.id", "ASC")
      .take(safeLimit);

    if (typeof cursor === "number" && Number.isFinite(cursor)) {
      query = query.where("product.id > :cursor", { cursor });
    }

    const products = await query.getMany();

    const lastItem = products[products.length - 1];

    return {
      data: products,
      nextCursor: lastItem ? lastItem.id : null,
      hasMore: products.length === safeLimit,
    };
  }
}

import { getProductRepository } from "../repository/product.repository";

interface getProductsParams {
  cursor?: string;
  limit: number;
}

export class ProductService {
  async getProducts({ cursor, limit }: getProductsParams) {
    const productRepository = getProductRepository();

    const query = productRepository
      .createQueryBuilder("product")
      .orderBy("product.product_id", "ASC")
      .take(limit + 1);

    if (cursor) {
      query.where("product.product_id > :cursor", {
        cursor: Number(cursor),
      });
    }

    const products = await query.getMany();

    const hasNext = products.length > limit;

    const data = hasNext ? products.slice(0, limit) : products;

    const nextCursor = data.length > 0 ? data[data.length - 1].product_id : null;

    return {
      data,
      nextCursor,
      hasNext,
    };
  }
}

import { pool } from "../../db/pool";
import { getProducts } from "../../db/sql/queries/product.queries";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { ApiError } from "../utils/apiError";

export interface IProduct {
  prod_id?: number;
  prod_name?: string;
  prod_description?: string;
  price?: number;
  stock?: number;
}

export interface ProductPaginationOptions {
  page: number;
  limit: number;
}

export class ProductRepository {
  productRepository = AppDataSource.getRepository(Product);

  async getProducts() {
    const result = await getProducts.run(undefined, pool);
    return result;
  }

  async getProductsPaginated({ page, limit }: ProductPaginationOptions) {
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      order: { prod_id: "ASC" },
      skip,
      take: limit,
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateProducts(id: number, newData: IProduct) {
    const productToUpdate = await this.productRepository.findOneBy({
      prod_id: id,
    });

    if (!productToUpdate) {
      throw new ApiError(404, "Product not found", "PRODUCT_NOT_FOUND");
    }

    this.productRepository.merge(productToUpdate, newData);

    return await this.productRepository.save(productToUpdate);
  }
}

import {
  IProduct,
  ProductPaginationOptions,
  ProductRepository,
} from "../repositories/product.repository";
import { ApiError } from "../utils/apiError";

export class ProductService {
  private productRepository: ProductRepository = new ProductRepository();

  async getProducts() {
    return await this.productRepository.getProducts();
  }

  async getProductsV2(options: ProductPaginationOptions) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;

    if (page < 1 || limit < 1) {
      throw new ApiError(400, "Page and limit must be positive numbers", "INVALID_PAGINATION");
    }

    return await this.productRepository.getProductsPaginated({ page, limit });
  }

  async updateProduct(id: number, newData: IProduct) {
    if (!id) {
      throw new ApiError(400, "Product ID is required", "INVALID_PRODUCT_ID");
    }

    return await this.productRepository.updateProducts(id, newData);
  }
}

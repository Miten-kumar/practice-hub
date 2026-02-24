import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  private productRepository: ProductRepository = new ProductRepository();
  async getProducts() {
    return await this.productRepository.getProducts();
  }
}

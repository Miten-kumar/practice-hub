import { ProductsRepository } from "../repositories/products.repository.js";

export class ProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async createProduct(name: string, description: string, price: number, stock: number) {
    return this.productsRepository.create({ name, description, price, stock } as any);
  }

  async getProductById(product_id: string) {
    return this.productsRepository.findById(product_id);
  }

  async updateProduct(product_id: string, name?: string, description?: string, price?: number, stock?: number) {
    const updateData: Partial<{ name: string; description: string; price: number; stock: number }> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    return this.productsRepository.update(product_id, updateData);
  }

  async deleteProduct(product_id: string) {
    await this.productsRepository.delete(product_id);
  }
}

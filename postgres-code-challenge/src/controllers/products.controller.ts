import { ProductsService } from "../services/products.service.js";

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  async createProduct(req: any, res: any) {
    try {
      const { name, description, price, stock } = req.body;
      const product = await this.productsService.createProduct(
        name,
        description,
        price,
        stock,
      );
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  }

  async getProductById(req: any, res: any) {
    try {
      const { product_id } = req.params;
      const product = await this.productsService.getProductById(product_id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve product" });
    }
  }

  async updateProduct(req: any, res: any) {
    try {
      const { product_id } = req.params;
      const { name, description, price, stock } = req.body;
      const updatedProduct = await this.productsService.updateProduct(
        product_id,
        name,
        description,
        price,
        stock,
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  }

  async deleteProduct(req: any, res: any) {
    try {
      const { product_id } = req.params;
      await this.productsService.deleteProduct(product_id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
}

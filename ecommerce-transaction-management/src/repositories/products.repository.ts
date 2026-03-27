import type { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source.js";
import { Products } from "../entity/Products.js";

export class ProductRepository {
  productRepository = AppDataSource.getRepository(Products);

  getProductById(prod_id: number, manager?: EntityManager) {
    const repository = manager
      ? manager.getRepository(Products)
      : this.productRepository;
    const product_details = repository.findOneBy({
      prod_id: prod_id,
    });

    return product_details;
  }

  reserveStock(
    prod_id: number,
    quantity: number,
    version: number,
    manager: EntityManager,
  ) {
    return manager
      .getRepository(Products)
      .createQueryBuilder()
      .update(Products)
      .set({
        stock: () => `stock - ${quantity}`,
        version: () => "version + 1",
      })
      .where("prod_id = :prodId", { prodId: prod_id })
      .andWhere("version = :version", { version })
      .andWhere("stock >= :quantity", { quantity })
      .execute();
  }
}

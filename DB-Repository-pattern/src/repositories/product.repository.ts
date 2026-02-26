import { pool } from "../../db/pool";
import { getProducts } from "../../db/sql/queries/product.queries";

export class ProductRepository {
  async getProducts() {
    const result = await getProducts.run(undefined, pool);
    return result;
  }
}

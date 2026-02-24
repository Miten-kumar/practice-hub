import { PoolType } from '../Db/db'; '../Db/db';
import { findExpensiveProduct } from '../Db/queries/queries.queries';
 
export class ProductRepository {
  async getMostExpensiveProduct(pool: PoolType) {
   
    const result = await findExpensiveProduct.run(undefined, pool);
    return result[0] || null;
  }
}
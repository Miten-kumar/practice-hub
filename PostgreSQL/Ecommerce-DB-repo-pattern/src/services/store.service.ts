import { pool } from '../Db/db';
import { UserRepository } from '../repositories/user.repository';
import { ProductRepository } from '../repositories/product.repository';
 
export class StoreService {
  private userRepo: UserRepository;
  private productRepo: ProductRepository;
 
  constructor() {
    this.userRepo = new UserRepository();
    this.productRepo = new ProductRepository();
  }
 
  async fetchUserDetails(userId: number) {
   
    const user = await this.userRepo.getUserById({ userId }, pool);
   
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
   
    const { password, ...safeUser } = user;
    return safeUser;
  }
 
  async fetchTopProduct() {
    const product = await this.productRepo.getMostExpensiveProduct(pool);
   
    if (!product) {
      throw new Error('No products available in the database');
    }
   
    return product;
  }
}
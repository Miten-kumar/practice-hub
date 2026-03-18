import { AppDataSource } from "../data-source";
import { Product } from "../entity/product";

export const getProductRepository = () => {
  if (AppDataSource.isInitialized) {
    return AppDataSource.getRepository(Product);
  }

  return AppDataSource.getRepository(Product);
};

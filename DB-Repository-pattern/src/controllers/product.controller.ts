import { Request, Response } from "express";
import { ProductService } from "../services/product.services";

const productService = new ProductService();

export const getProductsController = async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res
    .status(200)
    .json({ message: "Products retrieved successfully", products });
};

import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";

export const productController = async (req: Request, res: Response) => {
  const cursorValue = req.query.cursor;
  const limitValue = req.query.limit;
  const cursor =
    typeof cursorValue === "string" && cursorValue.trim() !== ""
      ? Number(cursorValue)
      : undefined;
  const limit =
    typeof limitValue === "string" && limitValue.trim() !== ""
      ? Number(limitValue)
      : undefined;

  const productRepository = new ProductRepository();
  const data = await productRepository.getProducts(cursor, limit);

  res.status(200).json(data);
};

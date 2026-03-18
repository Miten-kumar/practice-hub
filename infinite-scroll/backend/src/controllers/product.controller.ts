import { Request, Response } from "express";
import { Cursor, ProductService } from "../services/product.service";

const service = new ProductService();

export const getProducts = async (req: Request, res: Response) => {
  const { cursor, limit = "10" } = req.query;
  

  let parsedCursor: Cursor;

  if (cursor) {
    parsedCursor = JSON.parse(
      Buffer.from(cursor as string, "base64").toString(),
    );
  }

  const result = await service.getPaginated(parsedCursor, Number(limit) || 10);

  const encodedCursor = result.nextCursor
    ? Buffer.from(JSON.stringify(result.nextCursor)).toString("base64")
    : null;

  res.json({
    data: result.data,
    nextCursor: encodedCursor,
  });
};

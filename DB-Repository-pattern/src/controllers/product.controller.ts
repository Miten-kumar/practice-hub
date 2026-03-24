import { Request, Response } from "express";
import { ProductService } from "../services/product.services";

const productService = new ProductService();

const buildPaginationLink = (
  req: Request,
  page: number,
  limit: number,
  totalPages: number,
) => {
  if (page < 1 || page > totalPages) {
    return null;
  }

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
  return `${baseUrl}?page=${page}&limit=${limit}`;
};

export const getProductsController = async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res
    .status(200)
    .json({ message: "Products retrieved successfully", products });
};

export const getProductsV2Controller = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await productService.getProductsV2({ page, limit });

  res.status(200).json({
    message: "Products retrieved successfully",
    data: result.data,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    },
    links: {
      next: buildPaginationLink(
        req,
        result.page + 1,
        result.limit,
        result.totalPages,
      ),
      prev: buildPaginationLink(
        req,
        result.page - 1,
        result.limit,
        result.totalPages,
      ),
    },
  });
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { prod_name, prod_description, price, stock } = req.body;

  const product = await productService.updateProduct(Number(id), {
    prod_name,
    prod_description,
    price,
    stock,
  });

  res.status(200).json({ message: "Product updated successfully", product });
};

import { ProductsController } from "../controllers/products.controller.js";
import express from "express";

const router = express.Router();
const productsController = new ProductsController();

router.post("/", (req, res) => productsController.createProduct(req, res));
router.get("/:product_id", (req, res) => productsController.getProductById(req, res));
router.put("/:product_id", (req, res) => productsController.updateProduct(req, res));
router.delete("/:product_id", (req, res) => productsController.deleteProduct(req, res));

export default router;

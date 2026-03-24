import express from "express";
import {
  getProductsV2Controller,
  updateProductController,
} from "../../controllers/product.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const productV2Router = express.Router();

/**
 * @swagger
 * /v2/products:
 *   get:
 *     summary: Get paginated products
 *     description: Returns the v2 paginated product list response with HATEOAS next and prev links.
 *     tags: [Products V2]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of products per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListV2Response'
 *       400:
 *         description: Invalid pagination values
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productV2Router.get("/", asyncHandler(getProductsV2Controller));

/**
 * @swagger
 * /v2/products/{id}:
 *   patch:
 *     summary: Update a product in v2
 *     description: Updates a product using the shared update logic exposed through the v2 API.
 *     tags: [Products V2]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductUpdateResponse'
 *       400:
 *         description: Invalid product ID or request payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productV2Router.patch("/:id", asyncHandler(updateProductController));

export default productV2Router;

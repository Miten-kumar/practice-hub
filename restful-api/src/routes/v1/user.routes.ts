import { Router } from "express";
import { UserController } from "../../controllers/user.controller";

const router = Router();
const controller = new UserController();

// Deprecation example
router.use((req, res, next) => {
  res.setHeader("Deprecation", "false");
  next();
});
/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", controller.getAll);
/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", controller.getById);
/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Create a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", controller.create);
/**
 * @openapi
 * /api/v1/users/{id}:
 *  patch:
 *    summary: Patch a User
 *    tags:
 *      - Users
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *      responses:
 *       201:
 *         description: User Updated
 */
router.patch("/:id", controller.update);
/**
 * @openapi
 * /api/v1/users/{id}:
 *    delete:
 *      summary: Delete a User
 *      tags:
 *        - Users
 *      parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *      responses:
 *       201:
 *         description: User Deleted
 */
router.delete("/:id", controller.delete);

export default router;

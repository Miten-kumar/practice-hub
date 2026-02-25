import {UserController} from "../controllers/user.controller.js"
import express from "express";

const router = express.Router();
const userController = new UserController();

router.post("/", (req, res) => userController.createUser(req, res));
router.get("/:user_id", (req, res) => userController.getUserById(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res));
router.put("/:user_id", (req, res) => userController.updateUser(req, res));
router.delete("/:user_id", (req, res) => userController.deleteUser(req, res));

export default router;
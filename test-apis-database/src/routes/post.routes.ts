import { Router } from "express";
import { PostController } from "../controllers/PostController";

const router = Router();
const controller = new PostController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

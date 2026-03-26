import { Router } from "express";
import { createUser, imageUpload } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", createUser);
router.post("/upload-image", imageUpload);

export default router;

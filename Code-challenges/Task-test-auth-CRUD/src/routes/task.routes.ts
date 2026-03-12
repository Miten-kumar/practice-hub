import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router()

const taskController = new TaskController()

router.post("/create-task",taskController.createTask.bind(TaskController))

export default router
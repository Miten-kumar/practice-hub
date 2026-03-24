import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router()

const taskController = new TaskController()

router.post("/v1/tasks",taskController.createTask.bind(taskController))
router.get("/v1/tasks",taskController.getAllTasks.bind(taskController))
router.get("/v1/tasks/:id",taskController.getTaskById.bind(taskController))
router.put("/v1/tasks/:id",taskController.updateTask.bind(taskController))
router.delete("/v1/tasks/:id",taskController.deleteTask.bind(taskController))

export default router

import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router()

const taskController = new TaskController()

router.post("/create-task",taskController.createTask.bind(taskController))
router.get("/get-all-tasks",taskController.getAllTasks.bind(taskController))
router.get("/get-task/:id",taskController.getTaskById.bind(taskController))
router.put("/update-task/:id",taskController.updateTask.bind(taskController))
router.delete("/delete-task/:id",taskController.deleteTask.bind(taskController))

export default router

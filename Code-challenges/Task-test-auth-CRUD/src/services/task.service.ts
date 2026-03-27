import { Tasks } from "../entity/task";
import { getTaskRepository } from "../repositories/task.repository";
import { ApiError } from "../utils/errorHelper";
import { logger } from "../logger";
import { redictdata } from "../utils/redictdata";

export class TaskService {
  async createTask(taskData: Partial<Tasks>) {
    // logger.info("task creation started",{
    //   id:taskData.id,
    //   name:taskData.name
    // })

    const safeTask = redictdata(taskData)
    logger.info("task creation started", {
      id: safeTask.id,
      name: safeTask.name,
    });

    const taskRepository = getTaskRepository();

    if (!taskData.name) {
      throw new ApiError(400, "INVALID_INPUT", "name required");
    }

    const existingTask = await taskRepository.findOneBy({
      name: taskData.name,
    });
    if (existingTask) {
      throw new ApiError(409, "TASK_EXISTS", "Task already exists");
    }

    const newTask = taskRepository.create({
      ...taskData,
    });

    await taskRepository.save(newTask);
    return newTask;
  }

  async getAllTasks() {
    logger.info("getting all tasks started", {});

    const taskRepository = getTaskRepository();
    const tasks = await taskRepository.find();

    logger.info("all tasks retrived", {});

    return tasks;
  }

  async getTaskById(id: number) {
    logger.info("getting task started", {
      task_id: id,
    });

    const taskRepository = getTaskRepository();

    const task = await taskRepository.findOneBy({ id });
    if (!task) {
      throw new ApiError(404, "TASK_NOT_FOUND", "Task not found with given id");
    }

    logger.info("task retrived", {
      task_id: id,
    });

    return task;
  }

  async updateTask(id: number, taskData: Partial<Tasks>) {
    logger.info("update task started", {
      task_id: id,
    });

    const taskRepository = getTaskRepository();

    const existingTask = await taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new ApiError(404, "TASK_NOT_EXIST", "Task doesn't exist");
    }

    const updatedTask = taskRepository.merge(existingTask, taskData);
    await taskRepository.save(updatedTask);

    logger.info("task updated", {
      task_id: taskData.id,
      task_name: taskData.name,
    });

    return updatedTask;
  }

  async deleteTask(id: number) {
    logger.info("delete task started", {
      task_id: id,
    });

    const taskRepository = getTaskRepository();

    const existingTask = await taskRepository.findOneBy({ id });
    if (!existingTask) {
      throw new ApiError(404, "TASK_NOT_EXIST", "Task not created yet");
    }

    await taskRepository.remove(existingTask);

    logger.info("task deleted", {
      task_id: id,
    });
  }
}

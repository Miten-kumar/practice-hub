import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { logger } from "../logger";

export class TaskController {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("create task request", {
        url: req.url,
      });

      const taskService = new TaskService();
      const result = await taskService.createTask(req.body);
      res.status(201).json({
        success: true,
        message: "task created",
        data: result,
        links: {
          self: `/v1/tasks`,
          get: `/v1/tasks/${result.id}`,
          update: `/v1/tasks/${result.id}`,
          delete: `/v1/tasks/${result.id}`,
        },
      });
    } catch (error: any) {

    logger.error("create task request failed", {
      error: error instanceof Error ? error.message : error
    });

      next(error);
    }
  }

  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("get all tasks request", {
        url: req.url,
      });

      const taskService = new TaskService();
      const result = await taskService.getAllTasks();
      res.status(200).json({
        success: true,
        message: "tasks retrieved",
        data: result.map((task) => ({
          ...task,
          links: {
            self: `/v1/tasks`,
            create: `/v1/tasks`,
            update: `/v1/tasks/${task.id}`,
            delete: `/v1/tasks/${task.id}`,
          },
        })),
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("get task by id request", {
        url: req.url,
      });

      const taskService = new TaskService();
      const result = await taskService.getTaskById(
        parseInt(req.params.id as string),
      );

      res.status(200).json({
        success: true,
        message: "task retrieved",
        data: result,
        links: {
          self: `/v1/tasks`,
          create: `/v1/tasks`,
          update: `/v1/tasks/${result.id}`,
          delete: `/v1/tasks/${result.id}`,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("update task request", {
        url: req.url,
      });

      const taskService = new TaskService();
      const result = await taskService.updateTask(
        parseInt(req.params.id as string),
        req.body,
      );
      res.status(200).json({
        success: true,
        message: "task updated",
      });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("delete task request", {
        url: req.url,
      });

      const taskService = new TaskService();
      await taskService.deleteTask(parseInt(req.params.id as string));
      res.status(200).json({
        success: true,
        message: "task deleted",
      });
    } catch (error: any) {
      next(error);
    }
  }
}

import type { Request, Response, NextFunction } from 'express';
import { Task } from '../models/task';
 
const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name} = req.body;
        const newTask : Task = {id:Date.now(),name};
        Task.push(newTask);
 
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
    console.log(Task)
  } catch (error) {
    next(error);
  }
};
 
const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const task = Task.find((t) => t.id === taskId);

    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return; 
    }
 
    res.status(200).json({
      success: true,
      message: `Fetched details for task ID: ${taskId}`,
    });
  } catch (error) {
    next(error);
  }
};
 
const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { name } = req.body;

    const taskIndex = Task.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    Task[taskIndex].name = name;
 
    res.status(200).json({
      success: true,
      message: `Task ID: ${taskId} has been updated`,
      data: Task[taskIndex]
    });
  } catch (error) {
    next(error);
  }
};
 
const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = parseInt(req.params.taskId);
    
    const taskIndex = Task.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    Task.splice(taskIndex, 1);
 
    res.status(200).json({
      success: true,
      message: `Task ID: ${taskId} has been permanently deleted`,
    });
  } catch (error) {
    next(error);
  }
};
 
export { createTask, getTask , updateTask, deleteTask};
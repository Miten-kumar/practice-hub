import { NextFunction, Request,Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController{

  async createTask(req:Request,res:Response,next:NextFunction) {
    try{
      const taskService = new TaskService()
      const result = await taskService.createTask(req.body)
      res
        .status(201)
        .json({
          success:true,
          message:'task created',
          data:result,
          links:{
            self:`/v1/tasks`,
            get:`/v1/tasks/${result.id}`,
            update:`/v1/tasks/${result.id}`,
            delete:`/v1/tasks/${result.id}`
          }
        })
    }
    catch(error:any){
      next(error)
    }
  }

  async getAllTasks(req:Request,res:Response,next:NextFunction){
    try{
      const taskService = new TaskService()
      const result = await taskService.getAllTasks()
      res
        .status(200)
        .json({
          success:true,
          message:'tasks retrieved',
          data:result.map(task => ({
            ...task,
            links:{
            self:`/v1/tasks`,
            create:`/v1/tasks`,
            update:`/v1/tasks/${task.id}`,
            delete:`/v1/tasks/${task.id}`
          }
          })),
         
        })
    }
    catch(error:any){
      next(error)
    }
  }

  async getTaskById(req:Request,res:Response,next:NextFunction){
    try{
      const taskService = new TaskService()
      const result = await taskService.getTaskById(parseInt(req.params.id as string))

      res
        .status(200)
        .json({
          success:true,
          message:'task retrieved',
          data:result,
          links:{
            self:`/v1/tasks`,
            create:`/v1/tasks`,
            update:`/v1/tasks/${result.id}`,
            delete:`/v1/tasks/${result.id}`
          }
          
        })
      }
      catch(error:any){
        next(error)
      }
    }

    async updateTask(req:Request,res:Response,next:NextFunction){
      try{
        const taskService = new TaskService()
        const result = await taskService.updateTask(parseInt(req.params.id as string),req.body)
        res
          .status(200)
          .json({
            success:true,
            message:'task updated',
          })
        }
      catch(error:any){
        next(error)
      }
    }

    async deleteTask(req:Request,res:Response,next:NextFunction){
      try{
        const taskService = new TaskService() 
        await taskService.deleteTask(parseInt(req.params.id as string))
        res
          .status(200)
          .json({
            success:true,
            message:'task deleted'
          })
        }
      catch(error:any){
        next(error)
      }
    }
}

import { Request,Response } from "express";
import { TaskService } from "../services/task.service.js";

export class TaskController{

  async createTask(req:Request,res:Response) {
    try{
      const taskService = new TaskService()
      const result = await taskService.createTask(req.body)
      res
        .status(201)
        .json({
          success:true,
          message:'task created',
          data:result
        })
    }
    catch(error:any){
      res
        .status(400)
        .json({error:error.message})
    }
  }

  async getAllTasks(req:Request,res:Response){
    try{
      const taskService = new TaskService()
      const result = await taskService.getAllTasks()
      res
        .status(200)
        .json({
          success:true,
          message:'tasks retrieved',
          data:result
        })
    }
    catch(error:any){
      res
        .status(400)
        .json({error:error.message})
    }
  }

  async getTaskById(req:Request,res:Response){
    try{
      const taskService = new TaskService()
      const result = await taskService.getTaskById(parseInt(req.params.id as string))

      res
        .status(200)
        .json({
          success:true,
          message:'task retrieved',
          data:result
        })
      }
      catch{
        res
          .status(404)
          .json({error:'task not found'})
      }
    }

    async updateTask(req:Request,res:Response){
      try{
        const taskService = new TaskService()
        const result = await taskService.updateTask(parseInt(req.params.id as string),req.body)
        res
          .status(200)
          .json({
            success:true,
            message:'task updated',
            data:result
          })
        }
      catch{
        res
          .status(404)
          .json({error:'task not found'})
      }
    }

    async deleteTask(req:Request,res:Response){
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
      catch{
        res
          .status(404)
          .json({error:'task not found'})
      }
    }
}

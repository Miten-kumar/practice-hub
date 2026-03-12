import { Request,Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController{

  async createTask(req:Request,res:Response) {

    try{
      const taskService = new TaskService()
      const result = await taskService.createTask(req.body)
      res
        .status(201)
        .json({
          sucesss:true,
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

}
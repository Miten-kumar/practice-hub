import {Request,Response} from 'express'
import { Tasks } from '../entity/task'
import { taskRepository } from '../repositories/task.repository'

export class TaskService{

  async createTask(taskData:Partial<Tasks>) {

    const existingTask = await taskRepository.findOneBy({name:taskData.name})
    if(existingTask){
      throw new Error('task already exists')

    }

    const newTask = taskRepository.create({
      ...taskData
    })

    await taskRepository.save(newTask)
    return newTask
  }
}
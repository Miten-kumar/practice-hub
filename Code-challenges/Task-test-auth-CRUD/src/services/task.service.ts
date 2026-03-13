import { Tasks } from '../entity/task'
import { getTaskRepository } from '../repositories/task.repository'
 
export class TaskService{

  async createTask(taskData:Partial<Tasks>) {
    const taskRepository = getTaskRepository()

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

  async getAllTasks() {
    const taskRepository = getTaskRepository()
    const tasks = await taskRepository.find()
    return tasks
  } 

  async getTaskById(id:number) {
    const taskRepository = getTaskRepository()

    const task = await taskRepository.findOneBy({id}) 
    if(!task){
      throw new Error('task not found')
    }
    return task
  }

  async updateTask(id:number,taskData:Partial<Tasks>) {
    const taskRepository = getTaskRepository()

    const existingTask = await taskRepository.findOneBy({id})
    if(!existingTask){
      throw new Error('task not found')
    }

    const updatedTask = taskRepository.merge(existingTask,taskData)
    await taskRepository.save(updatedTask)
    return updatedTask
  }

  async deleteTask(id:number) {
    const taskRepository = getTaskRepository()

    const existingTask = await taskRepository.findOneBy({id})
    if(!existingTask){
      throw new Error('task not found')
    }

    await taskRepository.remove(existingTask)
  }

}

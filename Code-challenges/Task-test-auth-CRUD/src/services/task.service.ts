import { Tasks } from '../entity/task'
import { getTaskRepository } from '../repositories/task.repository'
import { ApiError} from '../utils/errorHelper'
 
export class TaskService{

  async createTask(taskData:Partial<Tasks>) {
    const taskRepository = getTaskRepository()

    if(!taskData.name){
      throw new ApiError(400,"INVALID_INPUT","name required")
    }

    const existingTask = await taskRepository.findOneBy({name:taskData.name})
    if(existingTask){
      throw new ApiError(409,"TASK_EXISTS","Task already exists",)

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
      throw new ApiError(404,"TASK_NOT_FOUND","Task not found with given id")
    }
    return task
  }

  async updateTask(id:number,taskData:Partial<Tasks>) {
    const taskRepository = getTaskRepository()

    const existingTask = await taskRepository.findOneBy({id})
    if(!existingTask){
      throw new ApiError(404,"TASK_NOT_EXIST","Task doesn't exist")
    }

    const updatedTask = taskRepository.merge(existingTask,taskData)
    await taskRepository.save(updatedTask)
    return updatedTask
  }

  async deleteTask(id:number) {
    const taskRepository = getTaskRepository()

    const existingTask = await taskRepository.findOneBy({id})
    if(!existingTask){
      throw new ApiError(404,"TASK_NOT_EXIST","Task not created yet")
    }

    await taskRepository.remove(existingTask)
  }

}

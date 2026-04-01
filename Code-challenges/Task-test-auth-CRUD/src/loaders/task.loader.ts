import DataLoader from "dataloader";
import { TaskService } from "../services/task.service";
 
export const createTaskLoader = () => {
 
  return new DataLoader(async (ids: readonly number[]) => {
  const taskService = new TaskService();
 
  const tasks = await taskService.getTasksByIds([...ids]);
 
  const taskMap = new Map(tasks.map(t => [t.id, t]));
 
  return ids.map(id =>taskMap.get(id));
  });
};
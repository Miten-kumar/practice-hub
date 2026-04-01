import DataLoader from "dataloader";
import { TaskService } from "../services/task.service";
 
export interface Context {
  user?: {
    id: number;
    name: string;
  };
  loaders:{
    task:DataLoader<number,any>,
  }
}
 
interface TaskArgs {
  id: number;
}
 
interface CreateTaskArgs {
  input: {
    name: string;
  };
}
 
interface UpdateTaskArgs {
  id: number;
  input: {
    name?: string;
  };
}
 
interface DeleteTaskArgs {
  id: number;
}
 
 
const taskService = new TaskService();
 
export const resolvers = {
  Query: {
    tasks: () => taskService.getAllTasks(),
 
    task: (_: unknown, { id }: TaskArgs, context: Context) => {
      return context.loaders.task.load(id);
    },
  },
 
  Mutation: {
    createTask: (
      _: unknown,
      { input }: CreateTaskArgs,
      { user }: Context
    ) => {
      if (!user) throw new Error("Unauthorized");
 
      return taskService.createTask(input);
    },
 
    updateTask: (_: unknown, { id, input }: UpdateTaskArgs) => {
      return taskService.updateTask(id, input);
    },
 
    deleteTask: (_: unknown, { id }: DeleteTaskArgs) => {
      return taskService.deleteTask(id);
    },
  },
};
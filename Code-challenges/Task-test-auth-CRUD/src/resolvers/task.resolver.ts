import { TaskService } from "../services/task.service";

const taskService = new TaskService()

export const resolvers = {

  Query: {
    tasks: () => taskService.getAllTasks(),
    task: (_:any, { id }:{id:string}) => taskService.getTaskById(id),
  },

  Mutation: {
    createTask: (_, { input }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      return taskService.createTask(input.name);
    },

    updateTask: (_, { id, input }) => {
      return taskService.updateTask(id, input.name);
    },

    deleteTask: (_, { id }) => {
      return taskService.deleteTask(id);
    },
  },
};
import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/task";

export const taskRepository = AppDataSource.getRepository(Tasks)
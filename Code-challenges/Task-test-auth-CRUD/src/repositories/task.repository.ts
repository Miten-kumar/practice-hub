import { AppDataSource } from "../data-source.js";
import { TestDataSource } from "../test-data-source.js";
import { Tasks } from "../entity/task.js";

export const getTaskRepository = () => {
  if (TestDataSource.isInitialized) {
    return TestDataSource.getRepository(Tasks);
  }

  return AppDataSource.getRepository(Tasks);
};

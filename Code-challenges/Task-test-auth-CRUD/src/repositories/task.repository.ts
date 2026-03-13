import { AppDataSource } from "../data-source";
import { TestDataSource } from "../test-data-source";
import { Tasks } from "../entity/task";

export const getTaskRepository = () => {
  if (TestDataSource.isInitialized) {
    return TestDataSource.getRepository(Tasks);
  }

  return AppDataSource.getRepository(Tasks);
};

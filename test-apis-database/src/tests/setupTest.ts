import { TestDataSource } from "../config/test-data-source";

beforeEach(async () => {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy();
  }
  await TestDataSource.initialize();
});

afterEach(async () => {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy();
  }
});

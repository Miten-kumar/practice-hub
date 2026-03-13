import { Tasks } from "../../entity/task"
import { TestDataSource } from "../../test-data-source"

beforeAll(async () => {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize()
  }
})

afterEach(async () => {
    if (!TestDataSource.isInitialized) {
      return
    }

    const repository = TestDataSource.getRepository(Tasks)
    await repository.clear()

})

afterAll(async () => {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy()
  }
})

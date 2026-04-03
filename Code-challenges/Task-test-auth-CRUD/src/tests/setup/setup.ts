import { Tasks } from "../../entity/task.js"
import { TestDataSource } from "../../test-data-source.js"

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

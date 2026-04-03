import request from 'supertest'
import app from '../../app.js'
import { TestDataSource } from '../../test-data-source.js'
import { Tasks } from '../../entity/task.js'
import '../setup/setup.js'

describe('task controller',() =>{

  describe('create task',() => {

    afterEach(async () => {
      if (!TestDataSource.isInitialized) {
        return
      }

      const taskRepository = TestDataSource.getRepository(Tasks)
    await taskRepository.clear()
    })

    it("should return 201 and task created", async () => {

      const response = await request(app)
        .post("/tasks/create-task")
        .send({
          name:"learn react"
        })
      console.log(response.body)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe("task created")
      expect(response.body.data).toHaveProperty("id")
    })
  })

  describe('fetch tasks',()=>{

    it('should return 200 and task fetched ', async () =>{

      const taskRepository = TestDataSource.getRepository(Tasks)

      await taskRepository.save({
        name:"CSS learn"
      })

      const response = await request(app)
        .get("/tasks/get-all-tasks")

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe("tasks retrieved")

      expect(response.body.data.length).toBe(1)
      expect(response.body.data[0]).toHaveProperty("id")
      expect(response.body.data[0].name).toBe("CSS learn")
    })
  })

  describe('fetch task by id', () => {
    it('should return 200 and task fetched by id', async () => {
      const taskRepository = TestDataSource.getRepository(Tasks)
      const savedTask = await taskRepository.save({
        name: "Node learn"
      })

      const response = await request(app)
        .get(`/tasks/get-task/${savedTask.id}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe("task retrieved")
      expect(response.body.data.id).toBe(savedTask.id)
      expect(response.body.data.name).toBe("Node learn")
    })

    it('should return 404 when task does not exist', async () => {
      const response = await request(app)
        .get('/tasks/get-task/999')

      expect(response.status).toBe(404)
      expect(response.body.error).toBe("task not found")
    })
  })

  describe('update task', () => {
    it('should return 200 and update task', async () => {
      const taskRepository = TestDataSource.getRepository(Tasks)
      const savedTask = await taskRepository.save({
        name: "before update"
      })

      const response = await request(app)
        .put(`/tasks/update-task/${savedTask.id}`)
        .send({ name: "after update" })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe("task updated")
      expect(response.body.data.id).toBe(savedTask.id)
      expect(response.body.data.name).toBe("after update")

      const updatedTask = await taskRepository.findOneBy({ id: savedTask.id })
      expect(updatedTask?.name).toBe("after update")
    })

    it('should return 404 when updating non-existing task', async () => {
      const response = await request(app)
        .put('/tasks/update-task/999')
        .send({ name: "no task" })

      expect(response.status).toBe(404)
      expect(response.body.error).toBe("task not found")
    })
  })

  describe('delete task', () => {
    it('should return 200 and delete task', async () => {
      const taskRepository = TestDataSource.getRepository(Tasks)
      const savedTask = await taskRepository.save({
        name: "delete me"
      })

      const response = await request(app)
        .delete(`/tasks/delete-task/${savedTask.id}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe("task deleted")

      const deletedTask = await taskRepository.findOneBy({ id: savedTask.id })
      expect(deletedTask).toBeNull()
    })

    it('should return 404 when deleting non-existing task', async () => {
      const response = await request(app)
        .delete('/tasks/delete-task/999')

      expect(response.status).toBe(404)
      expect(response.body.error).toBe("task not found")
    })
  })

  it("should save task in database", async () => {

    const res = await request(app)
      .post("/tasks/create-task")
      .send({ name: "db test" })

    expect(res.status).toBe(201)

    const taskRepository = TestDataSource.getRepository(Tasks)

    const task = await taskRepository.findOne({
      where: { name: "db test" }
    })

    expect(task).not.toBeNull()
  })

})

import { app } from "./app"
import { AppDataSource } from "./data-source"
import { seedUsers } from "./services/user.service"

const port = Number(process.env.PORT ?? "3000")

AppDataSource.initialize()
    .then(async () => {
        await seedUsers()
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.error("Failed to start application", error)
    })

import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Tasks } from "./entity/task.js";
import { Users } from "./entity/user.js";
 
dotenv.config()
 
export const TestDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
     entities: [Tasks,Users],
    migrations: ["src/migrations/*.ts"],
});

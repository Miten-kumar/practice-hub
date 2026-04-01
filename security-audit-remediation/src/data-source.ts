import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();
const databasePort = Number(process.env.DB_PORT ?? "5432");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number.isNaN(databasePort) ? 5432 : databasePort,
  username: process.env.DB_USER ?? "test",
  password: process.env.DB_PASSWORD ?? "test",
  database: process.env.DB_NAME ?? "test",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

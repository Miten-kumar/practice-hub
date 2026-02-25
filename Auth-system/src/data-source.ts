import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import env from "../env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

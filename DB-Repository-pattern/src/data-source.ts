import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import env from "../env";
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product],
  migrations: [],
  subscribers: [],
});

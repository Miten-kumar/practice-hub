import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../src/entity/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mpatel@2026",
  database: "vulnerable_db",
  synchronize: true,
  logging: false,
  entities: [User],
});
import { DataSource } from "typeorm";
import { Users } from "../models/user.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "2110",
  database: "auth",
  synchronize: false,
  logging: true,
  entities: [Users],
  migrations: ["src/db/migrations/*.ts"],
});

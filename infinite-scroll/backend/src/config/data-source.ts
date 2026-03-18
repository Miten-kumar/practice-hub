import "reflect-metadata";
import { DataSource } from "typeorm";
import { Products } from "../entities/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "2110",
  database: "perf_audit_db",
  synchronize: true,
  logging: false,
  entities: [Products],
});
import "dotenv/config";
import { DataSource } from "typeorm";
import { Users } from "../entities/User";
import { Posts } from "../entities/Post";

export const TestDataSource = new DataSource({
  type: "postgres",
  host: process.env.TEST_DB_HOST ?? process.env.DB_HOST ?? "localhost",
  port: Number(process.env.TEST_DB_PORT ?? process.env.DB_PORT ?? "5432"),
  username: process.env.TEST_DB_USER ?? process.env.DB_USER ?? "postgres",
  password: process.env.TEST_DB_PASSWORD ?? process.env.DB_PASSWORD ?? "",
  database: process.env.TEST_DB_NAME ?? "integration_test_db",
  synchronize: true,
  dropSchema: true,
  entities: [Users, Posts],
});

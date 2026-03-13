import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entities/User";
import { Posts } from "../entities/Post";

const databaseUrl = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(databaseUrl
    ? { url: databaseUrl }
    : {
        host: process.env.DB_HOST ?? "localhost",
        port: Number(process.env.DB_PORT ?? "5432"),
        username: process.env.DB_USER ?? "postgres",
        password: process.env.DB_PASSWORD ?? "",
        database: process.env.DB_NAME ?? "integration_test_app",
      }),
  synchronize: false,
  logging: false,
  entities: [Users, Posts],
  migrations: ["src/migrations/*.ts"],
});

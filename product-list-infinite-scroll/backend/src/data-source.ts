import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Product } from "./entity/Products";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});

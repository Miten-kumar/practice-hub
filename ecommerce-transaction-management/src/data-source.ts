import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/Users.js";
import { Products } from "./entity/Products.js";
import { Orders } from "./entity/Orders.js";
import { Payments } from "./entity/Payments.js";
import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const dbPort = Number(requireEnv("DB_PORT"));

if (Number.isNaN(dbPort)) {
  throw new Error("DB_PORT must be a valid number");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: requireEnv("DB_HOST"),
  port: dbPort,
  username: requireEnv("DB_USER"),
  password: requireEnv("DB_PASSWORD"),
  database: requireEnv("DB_NAME"),
  synchronize: true,
  logging: false,
  entities: [Users, Products, Orders, Payments],
  migrations: [],
  subscribers: [],
});

import type { DataSource } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { TestDataSource } from "../config/test-data-source";

export function getActiveDataSource(): DataSource {
  return TestDataSource.isInitialized ? TestDataSource : AppDataSource;
}


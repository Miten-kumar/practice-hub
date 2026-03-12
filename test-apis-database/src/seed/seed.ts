import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);

  const password = await bcrypt.hash("123456", 10);

  const user = repo.create({
    email: "test@test.com",
    password,
  });

  await repo.save(user);

  console.log("Seed completed");

  process.exit();
}

seed();

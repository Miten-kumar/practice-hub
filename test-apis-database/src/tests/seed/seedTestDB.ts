import bcrypt from "bcrypt";
import { TestDataSource } from "../../config/test-data-source";
import { Users } from "../../entities/User";

export async function seedUser() {
  const repo = TestDataSource.getRepository(Users);

  const password = await bcrypt.hash("password", 10);

  const user = repo.create({
    email: "test@test.com",
    password,
  });

  return repo.save(user);
}

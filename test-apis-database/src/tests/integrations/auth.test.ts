import request from "supertest";
import app from "../helpers/testApp";
import { seedUser } from "../seed/seedTestDB";

describe("Auth API", () => {
  beforeEach(async () => {
    await seedUser();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "new@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("new@test.com");
  });

  it("should login user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "password",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should not eccept duplicate email in register", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@test.com",
      password: "passwword",
    });

    expect(res.statusCode).not.toBe(200);
  });
});

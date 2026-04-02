import request from "supertest";
import app from "../helpers/testApp";
import { seedUser } from "../seed/seedTestDB";
import { Users } from "../../entities/User";

describe("Post API", () => {
  let user: Users;

  beforeEach(async () => {
    user = await seedUser();
  });

  it("should create a post", async () => {
    const res = await request(app)
      .post("/posts")
      .set("user-id", String(user.id))
      .send({
        title: "Test Post",
        content: "Integration test content",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test Post");
  });

  it("should fetch posts", async () => {
    const res = await request(app).get("/posts");

    expect(res.statusCode).toBe(200);
  });
  it("should update a post", async () => {
    // create post
    const createRes = await request(app)
      .post("/posts")
      .set("user-id", String(user.id))
      .send({
        title: "Old Title",
        content: "Old Content",
      });

    const postId = createRes.body.id;

    // update post
    const res = await request(app).put(`/posts/${postId}`).send({
      title: "Updated Title",
      content: "Updated Content",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });
});

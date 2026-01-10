import request from "supertest";
import { connectDB, closeDB, clearDB, app } from "./setup.js";

let token;

beforeAll(async () => {
  await connectDB();
  // register + login user to get token
  await request(app)
    .post("/auth/register")
    .send({ email: "test@example.com", password: "password123" });

  const res = await request(app)
    .post("/auth/login")
    .send({ email: "test@example.com", password: "password123" });

  token = res.body.token;
});

afterAll(closeDB);
afterEach(clearDB);

describe("Notes Endpoints", () => {
  it("should create a note", async () => {
    const res = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "Content", tags: ["work"] });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Note");
  });

  it("should list notes", async () => {
    await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Note 1", content: "Content" });

    const res = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it("should return 404 for nonexistent note", async () => {
    const res = await request(app)
      .get("/notes/64aaaaaaaaaaaaaaaaaaaaaa")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Note not found");
  });
});

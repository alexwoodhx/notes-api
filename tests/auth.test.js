import request from "supertest";
import { connectDB, closeDB, clearDB, app } from "./setup.js";

beforeAll(connectDB);
afterAll(closeDB);
afterEach(clearDB)

describe("Auth Endpoints", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ email: "test@example.com", password: "password123"});

        expect(res.statusCode).toBe(201);
        expect(res.body.userId).toBeDefined();
    });

    it("should not allow duplicate registration", async () => {
        await request(app)
          .post("/auth/register")
          .send({ email: "test@example.com", password: "password123" });
    
        const res = await request(app)
          .post("/auth/register")
          .send({ email: "test@example.com", password: "password123" });
    
        expect(res.statusCode).toBe(409);
        expect(res.body.message).toBe("Email already in use");
      });

      it("should login a registered user", async () => {
        await request(app)
          .post("/auth/register")
          .send({ email: "test@example.com", password: "password123" });
    
        const res = await request(app)
          .post("/auth/login")
          .send({ email: "test@example.com", password: "password123" });
    
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
      });

      it("should reject invalid credentials", async () => {
        const res = await request(app)
          .post("/auth/login")
          .send({ email: "fake@example.com", password: "wrong" });
    
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
      });
    
})
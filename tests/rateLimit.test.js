import request from "supertest";
import { connectDB, closeDB, app } from "./setup.js";

beforeAll(connectDB);
afterAll(closeDB);

describe("Rate limiting", () => {
    it("should block requests after limit is exceeded", async () => {
        for (let i = 0; i < 10; i++) {
            await request(app)
              .post("/auth/login")
              .send({ email: "test@test.com", password: "wrongpassword" });
        }

        const response = await request(app)
          .post("/auth/login")
          .send({ email: "test@test.com", password: "wrongpassword" });

        expect(response.status).toBe(429);
        expect(response.body.message).toMatch(/too many/i);
    });
});
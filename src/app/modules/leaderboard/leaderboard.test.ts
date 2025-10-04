import request from "supertest";
import { app } from "@/app";
import mongoose from "mongoose";
import config from "@/config";

let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI as string);

  // 1️⃣ Register a test user
  await request(app).post("/api/v1/auth/register").send({
    username: "leaderboardUser",
    email: "leaderboard@example.com",
    password: "Password123",
  });

  // 2️⃣ Login to get accessToken
  const loginRes = await request(app).post("/api/v1/auth/login").send({
    username: "leaderboardUser",
    password: "Password123",
  });

  accessToken = loginRes.body.data.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Leaderboard Routes", () => {
  it("should get leaderboard", async () => {
    const res = await request(app)
      .get("/api/v1/leaderboard")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should get user progress", async () => {
    const res = await request(app)
      .get("/api/v1/leaderboard/progress")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("solvedPuzzles");
  });

  it("should fail leaderboard access without token", async () => {
    const res = await request(app).get("/api/v1/leaderboard");
    expect(res.statusCode).toBe(401);
  });
});

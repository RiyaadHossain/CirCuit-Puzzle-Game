import request from "supertest";
import mongoose from "mongoose";
import { app } from "@/app";
import config from "@/config";

let accessToken: string;
let refreshToken: string;

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// --------------- TESTS -----------------

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email: "testuser1@example.com",
      password: "Password123",
      username: "testuser1",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id");
  });

  it("should login a user and return tokens", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      username: "testuser1",
      password: "Password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).toHaveProperty("refreshToken");

    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      username: "testuser1",
      password: "WrongPassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should refresh JWT access token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/refresh-token")
      .set("Cookie", [`refreshToken=${refreshToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("accessToken");
  });

  it("should fail refresh token without cookie", async () => {
    const res = await request(app).post("/api/v1/auth/refresh-token");

    expect(res.statusCode).toBe(500); 
    expect(res.body.success).toBe(false);
  });
});

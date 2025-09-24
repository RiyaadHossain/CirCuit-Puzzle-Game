import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

const loginSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(100),
  }),
});

const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string("Refresh Token is required!"),
  }),
});

export const AuthValidators = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
};

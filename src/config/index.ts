import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || "10", 10),
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY,
  MAX_HINTS: process.env.MAX_HINTS || "5",
  GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-2.5-flash",
};

// middlewares/security.ts
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { generalLimiter } from "@/config/rate-limit";

const applySecurityMiddlewares = (app: express.Application) => {
  // 1. Secure HTTP headers
  app.use(helmet());

  // 2. Prevent NoSQL injection
  // app.use(mongoSanitize()); // Commented out because not compatible with express v5 yet -> causing issues in production

  // 3. Enable CORS (update origin with your frontend URL)
  app.use(
    cors({
      origin: ["*"], // 🔒 Restrict in production (frontend origin only)
      credentials: true, // allow cookies
    })
  );

  // 4. General API rate limiter (100 requests / 15 min)
  app.use(generalLimiter);
};

export default applySecurityMiddlewares;

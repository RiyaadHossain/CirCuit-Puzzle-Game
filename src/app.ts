import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./app/routes";
import { errorHandler } from "./app/middlewares/error.middleware";
import { notFoundHandler } from "./app/middlewares/not-found";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import applySecurityMiddlewares from "./app/middlewares/security.middleware";

export const app = express();

// Middlewares
applySecurityMiddlewares(app); // Apply security middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Logging middleware
app.use("/api/v1", routes); // Routes

// Health Check
app.get("/health-check", (_, res) => res.json({ status: "ok" }));

// Not Found Handler
app.use(notFoundHandler);

// Error Handling
app.use(errorHandler);

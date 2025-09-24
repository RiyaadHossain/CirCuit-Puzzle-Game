import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./app/routes";
import { errorHandler } from "./app/middlewares/error-middleware";
import { notFoundHandler } from "./app/middlewares/not-fount";

export const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: "*" })); // 🔒 Restrict in production
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Routes
app.use("/api/v1", routes);

// Health Check
app.get("/health-check", (_, res) => res.json({ status: "ok" }));

// Not Found Handler
app.use(notFoundHandler)

// Error Handling
app.use(errorHandler);

import { Router } from "express";
import validateRequest from "@/app/middlewares/req-validator";
import { AuthControllers } from "./auth.controllers";
import { AuthValidators } from "./auth.validators";
import auth from "@/app/middlewares/auth.middleware";
import { loginLimiter } from "@/config/rate-limit";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidators.registerSchema),
  AuthControllers.register
);
router.post(
  "/login",
  validateRequest(AuthValidators.loginSchema),
  AuthControllers.login
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidators.refreshTokenSchema),
  AuthControllers.getRefreshToken
);
router.post("/logout", auth(), AuthControllers.logout);

export default router;

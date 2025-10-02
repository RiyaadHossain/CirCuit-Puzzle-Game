import { Router } from "express";
import validateRequest from "@/app/middlewares/req-validator";
import { AuthControllers } from "./auth.controllers";
import { AuthValidators } from "./auth.validators";
import auth from "@/app/middlewares/auth.middleware";

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
  // validateRequest(AuthValidators.refreshTokenSchema), // ! cookie not getting from request, need to fix
  AuthControllers.refreshToken
);
router.post("/logout", auth(), AuthControllers.logout);

export default router;

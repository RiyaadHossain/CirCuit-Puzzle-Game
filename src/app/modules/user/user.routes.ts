import auth from "@/app/middlewares/auth.middleware";
import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router = Router();

router.post(
  "/progress",
  auth(),
  UserControllers.getProgress
);

export default router;

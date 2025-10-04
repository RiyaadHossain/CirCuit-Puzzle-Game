import auth from "@/app/middlewares/auth.middleware";
import { Router } from "express";
import { leaderboardController } from "./lb.controllers";

const router = Router();

router.get("/", auth(), leaderboardController.getLeaderboard);
router.get("/progress", auth(), leaderboardController.getUserProgress);

export default router;
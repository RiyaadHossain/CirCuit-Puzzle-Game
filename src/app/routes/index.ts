import { Router } from "express";
const router = Router();
import authRoutes from "../modules/auth/auth.routes";
import gameRoutes from "../modules/game/game.routes";
import leaderboardRoutes from "../modules/leaderboard/lb.routes";

// Modular route mounting
const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/circuit", route: gameRoutes },
  { path: "/leaderboard", route: leaderboardRoutes },
];

const routes = moduleRoutes.map((route) => router.use(route.path, route.route));

export default routes;

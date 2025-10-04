import auth from "@/app/middlewares/auth.middleware";
import { Router } from "express";
import { GameControllers } from "./game.controllers";
import { upload } from "@/app/middlewares/file.middleware";

const router = Router();

router.get("/puzzles", auth(), GameControllers.getAllPuzzles);
router.post(
  "/upload",
  auth(),
  upload.single("circuitFile"), // multipart/form-data (circuitFile, puzzleId)
  GameControllers.submitPuzzle
);

router.post("/hint", auth(), upload.single("circuitFile"), GameControllers.getHint)

export default router;

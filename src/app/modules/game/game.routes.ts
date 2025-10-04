import auth from "@/app/middlewares/auth.middleware";
import { Router } from "express";
import { GameControllers } from "./game.controllers";
import { upload } from "@/app/middlewares/file.middleware";

const router = Router();

router.get("/puzzles", auth(), GameControllers.getAllPuzzles);
router.post(
  "/upload",
  auth(),
  upload.single("curcuitFile"), // multipart/form-data (curcuitFile, puzzleId)
  GameControllers.submitPuzzle
);

router.post("/hint", auth(), upload.single("curcuitFile"), GameControllers.getHint)

export default router;

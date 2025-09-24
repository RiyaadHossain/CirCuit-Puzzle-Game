import { Router } from "express";

const router = Router();

router.post('/register', (req, res) => {
  // Registration logic here
  res.status(201).json({ message: 'User registered successfully' });
});

export default router;
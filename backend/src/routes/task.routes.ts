import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
} from "../controllers/task.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

export default router;

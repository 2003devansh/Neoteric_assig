import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLeadStatus,
} from "../controllers/leads.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getLeads);
router.post("/", createLead);
router.patch("/:id/status", updateLeadStatus);
router.delete("/:id", deleteLead);

export default router;

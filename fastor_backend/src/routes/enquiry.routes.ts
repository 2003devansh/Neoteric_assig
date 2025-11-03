import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  submitPublicEnquiry,
  getUnclaimedLeads,
  claimLead,
  getClaimedLeads,
} from "../controllers/enquiry.controller";

import { Router } from "express";
const router = Router();

router.post("/public", submitPublicEnquiry);

router.get("/unclaimed", authenticateJWT, getUnclaimedLeads);

router.get("/claimed", authenticateJWT, getClaimedLeads);

router.patch("/:id/claim", authenticateJWT, claimLead);

export default router;

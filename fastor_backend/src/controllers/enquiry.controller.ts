import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
const prisma = new PrismaClient();

export const submitPublicEnquiry = async (req: Request, res: Response) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        course,
        claimedById: null,
      },
    });

    return res.status(201).json({
      message: "Public enquiry created succesfully",
      enquiry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUnclaimedLeads = async (req: Request, res: Response) => {
  try {
    const unclaimedLeads = await prisma.enquiry.findMany({
      where: {
        claimedById: null,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (unclaimedLeads.length === 0) {
      return res.status(200).json({
        message: "No unclaimed leads are currently available.",
      });
    }

    return res.status(200).json({
      message: "Unclaimed leads fetched successfully.",
      unclaimedLeads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch leads due to an internal server error.",
    });
  }
};

export const claimLead = async (req: AuthenticatedRequest, res: Response) => {
  const leadId = parseInt(req.params.id as string);
  const employeeId = req.user?.id;
  if (isNaN(leadId)) {
    return res
      .status(400)
      .json({ message: "Invalid lead ID format. Must be a number." });
  }
  if (!employeeId) {
    return res
      .status(401)
      .json({ message: "Employee authentication required." });
  }

  try {
    const lead = await prisma.enquiry.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    if (lead.claimedById !== null) {
      return res.status(409).json({
        message: "This enquiry has already been claimed by another counselor.",
      });
    }

    const updatedLead = await prisma.enquiry.update({
      where: { id: leadId },
      data: {
        claimedById: employeeId,
      },
    });

    return res.status(200).json({
      message: "Enquiry claimed successfully.",
      updatedLead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error during claim process.",
    });
  }
};

export const getClaimedLeads = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const employeeId = req.user?.id;

  if (!employeeId) {
    return res.status(401).json({
      message: "Authentication failed. Employee ID is missing.",
    });
  }

  try {
    const claimedLeads = await prisma.enquiry.findMany({
      where: {
        claimedById: employeeId,
      },
    });

    return res.status(200).json({
      message: "fetched",
      leads: claimedLeads,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error while fetching claimed leads.",
    });
  }
};

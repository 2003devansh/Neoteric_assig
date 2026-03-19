import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";

export const createLead = async (req: Request, res: Response) => {
  const { name, phone, requirement } = req.body;

  const lead = await prisma.lead.create({
    data: { name, phone, requirement },
  });

  res.status(201).json(lead);
};

export const getLeads = async (_req: Request, res: Response) => {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(leads);
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await prisma.lead.update({
    where: { id },
    data: { status },
  });

  res.json(updated);
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.lead.delete({ where: { id } });

  res.json({ message: "Deleted" });
};

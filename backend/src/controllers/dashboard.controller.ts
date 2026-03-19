import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";

export const getDashboardStats = async (_req: Request, res: Response) => {
  const totalLeads = await prisma.lead.count();

  const grouped = await prisma.lead.groupBy({
    by: ["status"],
    _count: true,
  });

  const totalTasks = await prisma.task.count();

  res.json({
    totalLeads,
    totalTasks,
    statusBreakdown: grouped,
  });
};

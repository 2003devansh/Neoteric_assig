import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  const { title, assignedTo, deadline } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      assignedTo,
      deadline: new Date(deadline),
    },
  });

  res.status(201).json(task);
};

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    orderBy: { deadline: "asc" },
  });

  res.json(tasks);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id } });

  res.json({ message: "Deleted" });
};

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const SECRET = process.env.ACCESS_SECRET as string;

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return res.status(400).json({ message: "User exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  res.status(201).json({ message: "Registered", userId: user.id });
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1d" });

  res.json({ token });
};

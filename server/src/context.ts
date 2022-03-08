import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader } from "../utils/auth";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export function context({ req }: { req: Request }): Context {
  const token = req.headers.authorization
    ? decodeAuthHeader(req.headers.authorization)
    : null;

  return { prisma, userId: token?.userId };
}

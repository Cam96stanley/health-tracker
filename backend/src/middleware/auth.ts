import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../env.ts";
import AppError from "../lib/AppError.ts";
import type { AuthRequest } from "../types/index.ts";

const auth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError(401, "Missing or invalid authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }

  next();
};

export default auth;

import type { Request, Response } from "express";
import asyncHandler from "../lib/asyncHandler.ts";
import userServices from "../services/user.services.ts";
import { createUserSchema, loginUserSchema } from "../types/user.types.ts";
import type { AuthRequest } from "../types/index.ts";
import AppError from "../lib/AppError.ts";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const body = createUserSchema.parse(req.body);
  const user = await userServices.signup(body);
  res.status(201).json(user);
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginUserSchema.parse(req.body);
  const token = await userServices.login(body);
  res.status(200).json(token);
});

const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    throw new AppError(401, "Unauthorized");
  }
  const user = await userServices.getMe(req.userId);
  res.status(200).json(user);
});

export default { signup, login, getMe };

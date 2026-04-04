import type { Request, Response } from "express";
import asyncHandler from "../lib/asyncHandler.ts";
import userServices from "../services/user.services.ts";
import { createUserSchema } from "../types/user.types.ts";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const body = createUserSchema.parse(req.body);
  const user = await userServices.signup(body);
  res.status(201).json(user);
});

export default { signup };

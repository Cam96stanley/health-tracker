import type { Request, Response } from "express";
import AppError from "../lib/AppError.ts";
import asyncHandler from "../lib/asyncHandler.ts";
import entryServices from "../services/entry.services.ts";
import { createEntrySchema, updateEntrySchema } from "../types/entry.types.ts";

const createEntry = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(401, "Unauthorized");
  }
  const body = createEntrySchema.parse(req.body);
  const entry = await entryServices.createEntry(req.userId, body);
  res.status(201).json(entry);
});

const getEntry = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(401, "Unauthorized");
  }
  const entry = await entryServices.getEntry(req.userId, req.params.id as string);
  res.status(200).json(entry);
});

const updateEntry = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(401, "Unauthorized");
  }
  const body = updateEntrySchema.parse(req.body);
  const entry = await entryServices.updateEntry(req.userId, req.params.id as string, body);
  res.status(200).json(entry);
});

export default { createEntry, getEntry, updateEntry };

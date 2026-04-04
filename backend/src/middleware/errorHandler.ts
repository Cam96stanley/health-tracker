import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../lib/AppError.ts";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    res.status(400).json({ message: err.issues });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;

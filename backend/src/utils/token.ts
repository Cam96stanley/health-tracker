import jwt from "jsonwebtoken";
import env from "../env.ts";

export const registerToken = (userId: string): string =>
  jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });

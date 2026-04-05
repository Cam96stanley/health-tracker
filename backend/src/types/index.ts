export { CreateUser, LoginUser } from "./user.types.ts";

import type { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

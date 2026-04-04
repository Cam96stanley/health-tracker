import AppError from "../lib/AppError.ts";
import prisma from "../lib/prisma.ts";
import type { CreateUser } from "../types/user.types.ts";
import { hashPassword } from "../utils/hash.ts";

const signup = async (user: CreateUser) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) {
    throw new AppError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(user.password)

  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password_hash: hashedPassword,
    },
  });

  return newUser;
};

export default { signup };

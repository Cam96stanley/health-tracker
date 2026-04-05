import AppError from "../lib/AppError.ts";
import prisma from "../lib/prisma.ts";
import type { CreateUser, LoginUser } from "../types/user.types.ts";
import { comparePassword, hashPassword } from "../utils/hash.ts";
import { registerToken } from "../utils/token.ts";

const signup = async (user: CreateUser) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) {
    throw new AppError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(user.password);

  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password_hash: hashedPassword,
    },
  });

  return newUser;
};

const login = async (user: LoginUser) => {
  const loggedInUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!loggedInUser) {
    throw new AppError(401, "Email or password are incorrect");
  }

  const passwordMatch = await comparePassword(
    user.password,
    loggedInUser.password_hash,
  );

  if (!passwordMatch) {
    throw new AppError(401, "Email or password are incorrect");
  }

  const token = registerToken(loggedInUser.id);

  return { token };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

export default { signup, login, getMe };

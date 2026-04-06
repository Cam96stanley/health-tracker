import AppError from "../lib/AppError.ts";
import prisma from "../lib/prisma.ts";
import type {
  CreateEntryInput,
  UpdateEntryInput,
} from "../types/entry.types.ts";

const createEntry = async (userId: string, body: CreateEntryInput) => {
  const newEntry = await prisma.entry.create({
    data: {
      userId,
      date: new Date(),
      sleepHours: body.sleepHours,
      notes: body.notes,
      symptoms: {
        createMany: {
          data: body.symptoms ?? [],
        },
      },
      medications: {
        createMany: {
          data: body.medications ?? [],
        },
      },
    },
    include: {
      symptoms: true,
      medications: true,
    },
  });

  return newEntry;
};

const getEntry = async (userId: string, entryId: string) => {
  const entry = await prisma.entry.findUnique({
    where: { id: entryId },
    include: { symptoms: true, medications: true },
  });

  if (!entry) {
    throw new AppError(404, "Entry not found");
  }

  if (entry.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  return entry;
};

const updateEntry = async (
  userId: string,
  entryId: string,
  body: UpdateEntryInput,
) => {
  const entry = await prisma.entry.findUnique({ where: { id: entryId } });

  if (!entry) {
    throw new AppError(404, "Entry not found");
  }

  if (entry.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  const updatedEntry = await prisma.entry.update({
    where: { id: entryId },
    data: {
      sleepHours: body.sleepHours,
      notes: body.notes,
    },
    include: { symptoms: true, medications: true },
  });

  return updatedEntry;
};

export default { createEntry, getEntry, updateEntry };

import prisma from "../lib/prisma.ts";
import type { CreateEntryInput } from "../types/entry.types.ts";

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

export default { createEntry };

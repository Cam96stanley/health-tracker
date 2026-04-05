import { z } from "zod";

export const createEntrySchema = z.object({
  sleepHours: z.number().min(0).max(24).optional(),
  notes: z.string().optional(),
  symptoms: z
    .array(
      z.object({
        name: z.string().min(1),
        severity: z.number().int().min(1).max(10),
      }),
    )
    .optional(),
  medications: z
    .array(
      z.object({
        name: z.string().min(1),
        taken: z.boolean(),
      }),
    )
    .optional(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;

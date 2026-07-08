import "server-only";

import { z } from "zod";

export const addGenreSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateGenreSchema = addGenreSchema.partial();

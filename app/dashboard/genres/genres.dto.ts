import "server-only";

import { Genre } from "@/generated/prisma/client/client";
import z from "zod";
import { addGenreSchema, updateGenreSchema } from "./genres.validation";

export type CreateGenreDTO = z.infer<typeof addGenreSchema>;
export type UpdateGenreDTO = z.infer<typeof updateGenreSchema>;

export const mapGenreDTO = (genre: Genre) => {
  return { id: genre.id, name: genre.name, description: genre.description };
};

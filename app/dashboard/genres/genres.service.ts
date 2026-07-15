import "server-only";

import { Prisma } from "@/generated/prisma/client/client";
import { NotFoundError, ValidationError } from "@/lib/errors";
import { genresDAL } from "./genres.dal";
import { mapGenreDTO } from "./genres.dto";
import { addGenreSchema, updateGenreSchema } from "./genres.validation";

export const genresService = {
  count: async (query?: string) => await genresDAL.count(query),

  create: async (data: Prisma.GenreCreateInput) => {
    const validateData = addGenreSchema.safeParse(data);

    if (!validateData.success) {
      throw new ValidationError(
        validateData.error.message,
        validateData.error.flatten().fieldErrors,
      );
    }

    const genre = await genresDAL.create(validateData.data);

    return genre.id;
  },

  findAll: async (limit: number, offset: number, query?: string) => {
    const genres = await genresDAL.findAll(limit, offset, query);

    if (!genres) {
      throw new NotFoundError("Genres");
    }

    return genres.map(mapGenreDTO);
  },

  findAllWithBooksCount: async (limit: number, offset: number) => {
    const genres = await genresDAL.findAllWithBooksCount(limit, offset);

    if (!genres) {
      throw new NotFoundError("Genres");
    }

    return genres;
  },

  findById: async (id: string) => {
    const genre = await genresDAL.findById(id);

    if (!genre) {
      throw new NotFoundError("Genre");
    }

    return mapGenreDTO(genre);
  },

  updateById: async (id: string, data: Prisma.GenreUpdateInput) => {
    const validateData = updateGenreSchema.safeParse(data);

    if (!validateData.success) {
      throw new ValidationError(
        validateData.error.message,
        validateData.error.flatten().fieldErrors,
      );
    }
    await genresDAL.updateById(id, data);
  },

  deleteById: async (id: string) => {
    await genresDAL.deleteById(id);
  },
};

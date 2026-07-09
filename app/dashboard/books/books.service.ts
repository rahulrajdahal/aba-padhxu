import "server-only";

import { Book } from "@/generated/prisma/client/client";
import {
  count,
  create,
  findAllWithGenre,
  findAllWithGenreName,
  findById,
  findBySlug,
  removeById,
  updateById,
} from "./books.dal";
import { CreateBookDTO, mapBookDTO, PatchBookDTO } from "./books.dto";

export const BookService = {
  createBook: async (data: CreateBookDTO) => {
    const book = await create(data);
    return book.id;
  },

  count: async (query?: string, genre?: string) => await count(query, genre),

  findAllBooksWithGenre: async (limit: number, offset: number) =>
    await findAllWithGenre(limit, offset),

  findAllBooksWithGenreName: async (
    limit: number,
    offset: number,
    query?: string,
    genre?: string,
  ) => await findAllWithGenreName(limit, offset, query, genre),

  findBookById: async (id: string) => mapBookDTO((await findById(id)) as Book),

  findBookBySlug: async (slug: string) =>
    mapBookDTO((await findBySlug(slug)) as Book),

  patchBookById: async (id: string, data: PatchBookDTO) =>
    await updateById(id, data),

  putBookById: async (id: string, data: CreateBookDTO) =>
    await updateById(id, data),

  deleteBookById: async (id: string) => await removeById(id),
};

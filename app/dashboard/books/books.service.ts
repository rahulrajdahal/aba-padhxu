import "server-only";

import { Book } from "@/generated/prisma/client/client";
import {
  create,
  findAll,
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

  findAllBooks: async () => await findAll(),

  findBookById: async (id: string) => mapBookDTO((await findById(id)) as Book),

  findBookBySlug: async (slug: string) =>
    mapBookDTO((await findBySlug(slug)) as Book),

  patchBookById: async (id: string, data: PatchBookDTO) =>
    await updateById(id, data),

  putBookById: async (id: string, data: CreateBookDTO) =>
    await updateById(id, data),

  deleteBookById: async (id: string) => await removeById(id),
};

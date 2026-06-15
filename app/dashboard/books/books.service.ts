import { Book } from "@/generated/prisma/client/client";
import {
  create,
  findById,
  findBySlug,
  removeById,
  updateById,
} from "./books.dal";
import { CreateBookDTO, mapBookDTO, PatchBookDTO } from "./books.dto";

export const createBook = async (data: CreateBookDTO) => {
  const book = await create(data);
  return book.id;
};

export const findBookById = async (id: string) =>
  mapBookDTO((await findById(id)) as Book);

export const findBookBySlug = async (slug: string) =>
  mapBookDTO((await findBySlug(slug)) as Book);

export const patchBookById = async (id: string, data: PatchBookDTO) =>
  await updateById(id, data);

export const putBookById = async (id: string, data: CreateBookDTO) =>
  await updateById(id, data);

export const deleteBookById = async (id: string) => await removeById(id);

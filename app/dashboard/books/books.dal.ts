import { prisma } from "@/prisma/prisma";
import { CreateBookDTO, PatchBookDTO } from "./books.dto";

export const create = async (data: CreateBookDTO) =>
  await prisma.book.create({ data });

export const findAll = async () => await prisma.book.findMany();

export const findById = async (id: string) =>
  await prisma.book.findUnique({ where: { id } });

export const findBySlug = async (slug: string) =>
  await prisma.book.findUnique({ where: { slug } });

export const updateById = async (id: string, data: PatchBookDTO) =>
  await prisma.book.update({ where: { id }, data });

export const removeById = async (id: string) =>
  await prisma.book.delete({ where: { id } });

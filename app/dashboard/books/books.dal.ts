import "server-only";

import { prisma } from "@/prisma/prisma";
import { CreateBookDTO, PatchBookDTO } from "./books.dto";
export const create = async (data: CreateBookDTO) =>
  await prisma.book.create({ data });

export const count = async (query?: string) =>
  await prisma.book.count({
    ...(query && {
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { author: { contains: query, mode: "insensitive" } },
          { isbn13: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  });

export const findAll = async () => await prisma.book.findMany();

export const findAllWithGenre = async (limit = 20, offset = 0) =>
  await prisma.book.findMany({
    take: limit,
    skip: offset,
    include: {
      genre: true,
    },
  });
export const findAllWithGenreName = async (
  limit = 20,
  offset = 0,
  query?: string,
) =>
  await prisma.book.findMany({
    take: limit,
    skip: offset,
    include: {
      genre: { select: { name: true } },
    },
    ...(query && {
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { author: { contains: query, mode: "insensitive" } },
          { isbn13: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  });

export const findById = async (id: string) =>
  await prisma.book.findUnique({ where: { id } });

export const findBySlug = async (slug: string) =>
  await prisma.book.findUnique({ where: { slug } });

export const updateById = async (id: string, data: PatchBookDTO) =>
  await prisma.book.update({ where: { id }, data });

export const removeById = async (id: string) =>
  await prisma.book.delete({ where: { id } });

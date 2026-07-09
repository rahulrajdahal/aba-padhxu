import "server-only";

import { Prisma } from "@/generated/prisma/client/client";
import { prisma } from "@/prisma/prisma";

export const genresDAL = {
  count: async (query?: string) =>
    await prisma.genre.count({
      ...(query && {
        where: { name: { contains: query, mode: "insensitive" } },
      }),
    }),

  create: async (data: Prisma.GenreCreateInput) =>
    await prisma.genre.create({ data }),

  findAll: async (limit = 20, offset = 0, query?: string) =>
    await prisma.genre.findMany({
      take: limit,
      skip: offset,
      ...(query && {
        where: { name: { contains: query, mode: "insensitive" } },
      }),
    }),

  findAllWithBooksCount: async (limit: number) =>
    await prisma.genre.findMany({
      take: limit,
      where: {
        books: {
          some: { genreId: { not: undefined } },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: { books: true },
        },
      },
    }),

  findById: async (id: string) =>
    await prisma.genre.findUnique({ where: { id } }),

  updateById: async (id: string, data: Prisma.GenreUpdateInput) =>
    await prisma.genre.update({ where: { id }, data }),

  deleteById: async (id: string) =>
    await prisma.genre.delete({ where: { id } }),
};

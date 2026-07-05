import { Prisma } from "@/generated/prisma/client/client";
import { prisma } from "@/prisma/prisma";

export const genresDAL = {
  count: async () => await prisma.genre.count(),

  create: async (data: Prisma.GenreCreateInput) =>
    await prisma.genre.create({ data }),

  findAll: async () => await prisma.genre.findMany(),

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

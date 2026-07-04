import { Prisma } from "@/generated/prisma/client/client";
import { prisma } from "@/prisma/prisma";

export const genresDAL = {
  count: async () => await prisma.genre.count(),

  create: async (data: Prisma.GenreCreateInput) =>
    await prisma.genre.create({ data }),

  findAll: async () => await prisma.genre.findMany(),

  findById: async (id: string) =>
    await prisma.genre.findUnique({ where: { id } }),

  updateById: async (id: string, data: Prisma.GenreUpdateInput) =>
    await prisma.genre.update({ where: { id }, data }),

  deleteById: async (id: string) =>
    await prisma.genre.delete({ where: { id } }),
};

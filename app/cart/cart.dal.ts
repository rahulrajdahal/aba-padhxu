import "server-only";

import { prisma } from "@/prisma/prisma";

export const CartDAL = {
  create: async (userId: string) => {
    return await prisma.cart.create({ data: { userId } });
  },

  findByUserId: async (userId: string) => {
    return await prisma.cart.findUnique({
      where: { userId },
    });
  },

  findOrCreateByUserId: async (userId: string) => {
    return await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  },

  deleteById: async (id: string) => {
    return await prisma.cart.delete({ where: { id } });
  },
};

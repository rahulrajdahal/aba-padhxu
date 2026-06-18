import { prisma } from "@/prisma/prisma";
import { CreateOrderDTO, PatchOrderDTO, PutOrderDTO } from "./orders.dto";

export const OrderRepository = {
  create: async (data: CreateOrderDTO) => {
    return await prisma.order.create({
      data,
    });
  },

  findAll: async (query: string, limit: number, page: number) => {
    return await prisma.order.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        OR: [
          { orderItems: { some: { historicalTitle: { contains: query } } } },
          { orderItems: { some: { historicalIsbn13: { contains: query } } } },
        ],
      },
    });
  },

  findById: async (id: string) => {
    return await prisma.order.findUnique({
      where: { id },
    });
  },

  updateById: async (id: string, data: PatchOrderDTO | PutOrderDTO) => {
    return await prisma.order.update({
      where: { id },
      data,
    });
  },

  removeById: async (id: string) => {
    return await prisma.order.delete({
      where: { id },
    });
  },
};

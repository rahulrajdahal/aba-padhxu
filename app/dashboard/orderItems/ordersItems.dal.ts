import { prisma } from "@/prisma/prisma";
import {
  CreateOrderItemDTO,
  PatchOrderItemDTO,
  PutOrderItemDTO,
} from "./orderItems.dto";

export const OrderItemRepository = {
  create: async (data: CreateOrderItemDTO) => {
    return await prisma.orderItem.create({
      data,
    });
  },

  findAll: async (query: string, limit: number, page: number) => {
    return await prisma.orderItem.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        OR: [
          { historicalTitle: { contains: query } },
          { historicalIsbn13: { contains: query } },
        ],
      },
    });
  },

  findById: async (id: string) => {
    return await prisma.orderItem.findUnique({
      where: { id },
    });
  },

  updateById: async (id: string, data: PatchOrderItemDTO | PutOrderItemDTO) => {
    return await prisma.orderItem.update({
      where: { id },
      data,
    });
  },

  removeById: async (id: string) => {
    return await prisma.orderItem.delete({
      where: { id },
    });
  },
};

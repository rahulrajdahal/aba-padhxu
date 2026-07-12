import {
  CartItemFindManyArgs,
  CartItemFindUniqueArgs,
  CartItemUpdateInput,
} from "@/generated/prisma/client/models";
import { prisma } from "@/prisma/prisma";

export const CartItemDAL = {
  count: async (cartId: string) => {
    return await prisma.cartItem.count({
      where: { cartId },
    });
  },

  findMany: async (args: CartItemFindManyArgs) => {
    return await prisma.cartItem.findMany(args);
  },

  create: async (cartId: string, listingId: string) => {
    return await prisma.cartItem.create({
      data: { quantity: 1, cartId, listingId },
    });
  },

  findUnique: async (args: CartItemFindUniqueArgs) => {
    return await prisma.cartItem.findUnique(args);
  },

  findById: async (id: string) => {
    return await prisma.cartItem.findUnique({
      where: { id },
    });
  },

  updateById: async (id: string, data: Partial<CartItemUpdateInput>) =>
    await prisma.cartItem.update({
      where: { id },
      data,
    }),

  updateQuantityById: async (id: string, type: "increment" | "decrement") => {
    await CartItemDAL.updateById(id, {
      quantity: {
        [type]: 1,
      },
    });
  },

  deleteById: async (id: string) => {
    return await prisma.cartItem.delete({ where: { id } });
  },
};

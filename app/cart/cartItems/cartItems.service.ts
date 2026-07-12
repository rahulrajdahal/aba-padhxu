import "server-only";

import { CartItemUpdateInput } from "@/generated/prisma/client/models";
import { CartItemDAL } from "./cartItems.dal";

export const cartItemsService = {
  count: async (cartId: string) => {
    return await CartItemDAL.count(cartId);
  },

  create: async (cartId: string, listingId: string) => {
    const cartItem = await CartItemDAL.create(cartId, listingId);

    return cartItem.id;
  },

  findById: async (id: string) => {
    return await CartItemDAL.findById(id);
  },

  findByCartIdAndListingId: async (cartId: string, listingId: string) => {
    return await CartItemDAL.findUnique({
      where: { cartId_listingId: { cartId, listingId } },
    });
  },

  findByCartId: async (cartId: string) => {
    return await CartItemDAL.findMany({
      where: { cartId },
    });
  },

  findByCartIdWithListings: async (cartId: string) => {
    return await CartItemDAL.findMany({
      where: { cartId },
      include: { listing: { include: { book: true } } },
    });
  },

  updateById: async (id: string, data: Partial<CartItemUpdateInput>) => {
    await CartItemDAL.updateById(id, data);
  },

  incrementQuantityById: async (id: string) => {
    await CartItemDAL.updateQuantityById(id, "increment");
  },

  decrementQuantityById: async (id: string) => {
    await CartItemDAL.updateQuantityById(id, "decrement");
  },

  deleteById: async (id: string) => {
    await CartItemDAL.deleteById(id);
  },
};

import "server-only";

import { CartDAL } from "./cart.dal";

export const cartService = {
  create: async (userId: string) => {
    const cart = await CartDAL.create(userId);
    return cart.id;
  },

  findByUserId: async (userId: string) => {
    return await CartDAL.findByUserId(userId);
  },

  findOrCreateByUserId: async (userId: string) => {
    const cart = await cartService.findByUserId(userId);

    if (!cart) {
      return await cartService.create(userId);
    }

    return cart.id;
  },

  deleteById: async (id: string) => {
    return await CartDAL.deleteById(id);
  },
};

import "server-only";

import { WishlistsDAL } from "./wishlists.dal";
import { CreateWishlistDTO } from "./wishlists.dto";

export const wishlistsService = {
  create: async (data: CreateWishlistDTO) => {
    return await WishlistsDAL.create(data);
  },

  findAll: async () => {
    return await WishlistsDAL.findAll();
  },

  findAllWithBooks: async () => {
    return await WishlistsDAL.findAllWithBooks();
  },

  findAllByUserId: async (userId: string) => {
    return await WishlistsDAL.findAllByUserId(userId);
  },

  findAllByUserIdWithBooks: async (userId: string) => {
    return await WishlistsDAL.findAllByUserIdWithBooks(userId);
  },

  countByUserId: async (userId: string) => {
    return await WishlistsDAL.countByUserId(userId);
  },

  findByUserIdBookId: async (userId: string, bookId: string) => {
    return await WishlistsDAL.findByUserIdBookId(userId, bookId);
  },

  deleteByUserIdBookId: async (userId: string, bookId: string) => {
    return await WishlistsDAL.deleteByUserIdBookId(userId, bookId);
  },
};

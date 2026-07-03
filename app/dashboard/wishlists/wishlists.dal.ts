import "server-only";

import { prisma } from "@/prisma/prisma";
import { CreateWishlistDTO } from "./wishlists.dto";

export const WishlistsDAL = {
  create: async (data: CreateWishlistDTO) => {
    const wishlist = await prisma.wishlist.create({
      data: {
        bookId: data.bookId,
        userId: data.userId,
      },
    });
    return wishlist.bookId;
  },

  countByUserId: async (userId: string) => {
    return await prisma.wishlist.count({ where: { userId } });
  },

  findAll: async () => {
    return await prisma.wishlist.findMany();
  },

  findAllWithBooks: async () => {
    return await prisma.wishlist.findMany({
      include: {
        book: true,
      },
    });
  },

  findAllByUserId: async (userId: string) => {
    return await prisma.wishlist.findMany({ where: { userId } });
  },

  findByUserIdBookId: async (userId: string, bookId: string) => {
    return await prisma.wishlist.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });
  },

  deleteByUserIdBookId: async (userId: string, bookId: string) => {
    return await prisma.wishlist.delete({
      where: { userId_bookId: { userId, bookId } },
    });
  },
};

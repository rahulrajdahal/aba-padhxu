import "server-only";

import { prisma } from "@/prisma/prisma";
import { CreateListingDTO, PatchListingDTO } from "./listings.dto";

export const ListingsDAL = {
  create: async (data: CreateListingDTO) => {
    const listing = await prisma.listing.create({ data });
    return listing.id;
  },

  findAll: async () => {
    const listings = await prisma.listing.findMany();
    return listings;
  },

  findAllWithBooks: async (query?: string) => {
    return await prisma.listing.findMany({
      include: {
        book: { include: { wishlistItems: { select: { bookId: true } } } },
      },
      ...(query && {
        where: {
          book: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { isbn13: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ],
          },
        },
      }),
    });
  },

  findBySellerId: async (sellerId: string) => {
    const listings = await prisma.listing.findMany({ where: { sellerId } });
    return listings;
  },

  findById: async (id: string) => {
    const listing = await prisma.listing.findUnique({ where: { id } });
    return listing;
  },

  findByIdWithBookAndSeller: async (id: string) => {
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        book: true,
        seller: {
          include: { profile: { select: { firstName: true, lastName: true } } },
        },
      },
    });
    return listing;
  },

  updateById: async (id: string, data: PatchListingDTO) => {
    const listing = await prisma.listing.update({ where: { id }, data });
    return listing;
  },

  updateQuantityById: async (id: string, type: "increment" | "decrement") => {
    const listing = await prisma.listing.update({
      where: { id },
      data: { quantity: { [type]: 1 } },
    });
    return listing;
  },

  deleteById: async (id: string) => {
    const listing = await prisma.listing.delete({ where: { id } });
    return listing;
  },
};

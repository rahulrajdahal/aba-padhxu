import "server-only";

import { BookCondition } from "@/generated/prisma/client/enums";
import { prisma } from "@/prisma/prisma";
import { CreateListingDTO, PatchListingDTO } from "./listings.dto";

export const ListingsDAL = {
  countAll: async (
    query?: string,
    genre?: string,
    condition?: BookCondition,
  ) => {
    return await prisma.listing.count({
      where: {
        book: {
          ...(query && {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { isbn13: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ],
          }),
          ...(genre && { genre: { name: { equals: genre } } }),
        },
        ...(condition && { condition }),
      },
    });
  },

  create: async (data: CreateListingDTO) => {
    const listing = await prisma.listing.create({ data });
    return listing.id;
  },

  findAll: async (
    limit: number,
    offset: number,
    query?: string,
    condition?: BookCondition,
  ) => {
    const listings = await prisma.listing.findMany({
      take: limit,
      skip: offset,
      where: {
        ...(query && {
          book: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { isbn13: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ],
          },
        }),
        ...(condition && { condition }),
      },
    });
    return listings;
  },

  findAllWithBooks: async (query?: string) => {
    return await prisma.listing.findMany({
      include: {
        book: {
          include: {
            genre: { select: { name: true } },
            wishlistItems: { select: { bookId: true } },
          },
        },
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

  findAllWithBooksAndGenreName: async (
    limit = 20,
    offset = 0,
    query?: string,
    genre?: string,
    condition?: BookCondition,
  ) => {
    return await prisma.listing.findMany({
      take: limit,
      skip: offset,
      include: {
        book: {
          include: {
            genre: { select: { name: true } },
          },
        },
      },
      where: {
        book: {
          ...(query && {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { isbn13: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ],
          }),
          ...(genre && { genre: { name: { equals: genre } } }),
        },
        ...(condition && { condition }),
      },
    });
  },

  countBySellerId: async (
    sellerId: string,
    query?: string,
    condition?: BookCondition,
  ) => {
    return await prisma.listing.count({
      where: {
        sellerId,
        ...(query && {
          book: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { isbn13: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ],
          },
        }),
        ...(condition && { condition }),
      },
    });
  },

  findBySellerId: async (
    sellerId: string,
    limit = 20,
    offset = 0,
    query?: string,
    condition?: BookCondition,
  ) => {
    return await prisma.listing.findMany({
      take: limit,
      skip: offset,
      include: { book: { select: { title: true } } },
      where: {
        sellerId,
        ...(query && {
          book: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { isbn13: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ],
          },
        }),
        ...(condition && { condition }),
      },
    });
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

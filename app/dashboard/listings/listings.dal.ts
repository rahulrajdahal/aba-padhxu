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

  findBySellerId: async (sellerId: string) => {
    const listings = await prisma.listing.findMany({ where: { sellerId } });
    return listings;
  },

  findById: async (id: string) => {
    const listing = await prisma.listing.findUnique({ where: { id } });
    return listing;
  },

  update: async (id: string, data: PatchListingDTO) => {
    const listing = await prisma.listing.update({ where: { id }, data });
    return listing;
  },

  delete: async (id: string) => {
    const listing = await prisma.listing.delete({ where: { id } });
    return listing;
  },
};

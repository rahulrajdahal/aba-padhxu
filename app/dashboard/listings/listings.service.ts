import "server-only";

import { BookCondition } from "@/generated/prisma/client/enums";
import { ListingsDAL } from "./listings.dal";
import { CreateListingDTO, PatchListingDTO } from "./listings.dto";

export const ListingsService = {
  create: async (data: CreateListingDTO) => {
    return await ListingsDAL.create(data);
  },

  updateById: async (id: string, data: PatchListingDTO) => {
    return await ListingsDAL.updateById(id, data);
  },

  findAll: async () => {
    return await ListingsDAL.findAll();
  },

  findAllWithBooks: async (query?: string) => {
    return await ListingsDAL.findAllWithBooks(query);
  },

  decrementQuantityById: async (id: string) => {
    return await ListingsDAL.updateQuantityById(id, "decrement");
  },

  incrementQuantityById: async (id: string) => {
    return await ListingsDAL.updateQuantityById(id, "increment");
  },

  findById: async (id: string) => {
    return await ListingsDAL.findById(id);
  },

  findByIdWithBookAndSeller: async (id: string) => {
    return await ListingsDAL.findByIdWithBookAndSeller(id);
  },

  countBySellerId: async (
    sellerId: string,
    query?: string,
    condition?: BookCondition,
  ) => {
    return await ListingsDAL.countBySellerId(sellerId, query, condition);
  },

  findBySellerId: async (
    sellerId: string,
    limit: number,
    offset: number,
    query?: string,
    condition?: BookCondition,
  ) => {
    return await ListingsDAL.findBySellerId(
      sellerId,
      limit,
      offset,
      query,
      condition,
    );
  },

  deleteById: async (id: string) => {
    return await ListingsDAL.deleteById(id);
  },
};

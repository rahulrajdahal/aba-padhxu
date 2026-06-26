import "server-only";

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

  findAllWithBooks: async () => {
    return await ListingsDAL.findAllWithBooks();
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

  findBySellerId: async (sellerId: string) => {
    return await ListingsDAL.findBySellerId(sellerId);
  },

  deleteById: async (id: string) => {
    return await ListingsDAL.deleteById(id);
  },
};

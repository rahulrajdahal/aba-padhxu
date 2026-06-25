import "server-only";

import { ListingsDAL } from "./listings.dal";
import { CreateListingDTO, PatchListingDTO } from "./listings.dto";

export const ListingsService = {
  create: async (data: CreateListingDTO) => {
    return await ListingsDAL.create(data);
  },

  update: async (id: string, data: PatchListingDTO) => {
    return await ListingsDAL.update(id, data);
  },

  findAll: async () => {
    return await ListingsDAL.findAll();
  },

  findById: async (id: string) => {
    return await ListingsDAL.findById(id);
  },

  findBySellerId: async (sellerId: string) => {
    return await ListingsDAL.findBySellerId(sellerId);
  },

  delete: async (id: string) => {
    return await ListingsDAL.delete(id);
  },
};

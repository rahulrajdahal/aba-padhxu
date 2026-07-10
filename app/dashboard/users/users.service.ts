import "server-only";

import { User } from "@/generated/prisma/client/client";
import { usersDal } from "./users.dal";
import { CreateUserDTO, mapUserDTO, PatchUserDTO } from "./users.dto";

export const usersService = {
  count: async (query?: string) => await usersDal.count(query),

  findAll: async (limit: number, offset: number, query?: string) =>
    await usersDal.findAll(limit, offset, query),

  createUser: async (data: CreateUserDTO) => {
    const user = await usersDal.create({ ...data });
    return user.id;
  },

  getUserById: async (id: string) => {
    const user = await usersDal.findById(id);
    return mapUserDTO(user as User);
  },

  getUserByIdWithPassword: async (id: string) => {
    const user = await usersDal.findById(id);
    return user;
  },

  getUserByEmail: async (email: string) => {
    return await usersDal.findByEmail(email);
  },

  patchUserById: async (id: string, data: PatchUserDTO) =>
    await usersDal.updateById(id, data),
};

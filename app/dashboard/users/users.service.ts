import "server-only";

import { User } from "@/generated/prisma/client/client";
import { userProfilesDal } from "../user_profiles/user_profiles.dal";
import { usersDal } from "./users.dal";
import {
  CreateUserDTO,
  CreateUserWithProfileDTO,
  mapUserDTO,
  PatchUserDTO,
  UpdateUserWithProfileDTO,
} from "./users.dto";

export const usersService = {
  count: async (query?: string) => await usersDal.count(query),

  findAll: async (limit: number, offset: number, query?: string) =>
    await usersDal.findAll(limit, offset, query),

  createUser: async (data: CreateUserDTO) => {
    const user = await usersDal.create({ ...data });
    return user.id;
  },

  createUserWithProfile: async (data: CreateUserWithProfileDTO) => {
    const user = await usersDal.create({
      email: data.email,
      passwordHash: data.password,
      isAdmin: data?.isAdmin || false,
    });

    await userProfilesDal.create({
      firstName: data.firstName,
      lastName: data.lastName,
      isSeller: data.isSeller,
      userId: user.id,
      phoneNumber: data.phoneNumber,
    });

    return user.id;
  },

  getUserById: async (id: string) => {
    const user = await usersDal.findById(id);
    return mapUserDTO(user as User);
  },

  findUserWithProfileById: async (id: string) => {
    const user = await usersService.getUserById(id);
    const profile = await userProfilesDal.findByUserId(id);

    return { ...user, ...profile };
  },

  updateUserWithProfileById: async (
    id: string,
    data: UpdateUserWithProfileDTO,
  ) => {
    await usersService.patchUserById(id, {
      email: data?.email,
      isAdmin: data?.isAdmin,
      passwordHash: data?.password,
    });

    await userProfilesDal.updateByUserId(id, {
      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      isSeller: data?.isSeller,
    });
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

  deleteUserWithProfileById: async (id: string) =>
    await usersDal.deleteById(id),
};

import { prisma } from "@/prisma/prisma";
import {
  CreateUserAddressDTO,
  PatchUserAddressDTO,
} from "./user_addresses.dto";

export const userAddressDals = {
  create: async (data: CreateUserAddressDTO) =>
    await prisma.userAddress.create({ data }),

  findAllByUserId: async (userId: string) =>
    await prisma.userAddress.findMany({ where: { userId } }),

  findById: async (id: string) =>
    await prisma.userAddress.findUnique({ where: { id } }),

  updateById: async (id: string, data: PatchUserAddressDTO) =>
    await prisma.userAddress.update({ where: { id }, data }),

  removeById: async (id: string) =>
    await prisma.userAddress.delete({ where: { id } }),
};

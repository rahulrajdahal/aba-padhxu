import { prisma } from "@/prisma/prisma";
import {
  CreateUserAddressDTO,
  PatchUserAddressDTO,
} from "./user_addresses.dto";

export const create = async (data: CreateUserAddressDTO) =>
  await prisma.userAddress.create({ data });

export const findAllByUserId = async (userId: string) =>
  await prisma.userAddress.findMany({ where: { userId } });

export const findById = async (id: string) =>
  await prisma.userAddress.findUnique({ where: { id } });

export const updateById = async (id: string, data: PatchUserAddressDTO) =>
  await prisma.userAddress.update({ where: { id }, data });

export const removeById = async (id: string) =>
  await prisma.userAddress.delete({ where: { id } });

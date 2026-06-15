import { prisma } from "@/prisma/prisma";
import { CreateUserDTO, PatchUserDTO } from "./users.dto";

export const create = async (data: CreateUserDTO) =>
  await prisma.user.create({ data });

export const findById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const updateById = async (id: string, data: PatchUserDTO) =>
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });

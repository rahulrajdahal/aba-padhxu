import { prisma } from "@/prisma/prisma";
import { CreateTokenDTO, PatchTokenDTO } from "./tokens.dto";

export const create = async (data: CreateTokenDTO) =>
  await prisma.token.create({
    data: {
      ...data,
      expiresAt: data?.expiresAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

export const findById = async (id: string) => {
  return await prisma.token.findUnique({ where: { id } });
};

export const findByToken = async (token: string) => {
  return await prisma.token.findUnique({ where: { token } });
};

export const updateById = async (
  id: string,
  data: PatchTokenDTO | CreateTokenDTO,
) => {
  return await prisma.token.update({ data, where: { id } });
};

export const removeById = async (id: string) => {
  return await prisma.token.delete({ where: { id } });
};

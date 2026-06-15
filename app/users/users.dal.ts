import { prisma } from "@/prisma/prisma";

export const create = async (email: string, passwordHash: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return user.id;
};

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

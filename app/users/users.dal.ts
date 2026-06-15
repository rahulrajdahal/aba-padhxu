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

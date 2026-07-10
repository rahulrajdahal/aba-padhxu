import "server-only";

import { prisma } from "@/prisma/prisma";
import { CreateUserDTO, PatchUserDTO } from "./users.dto";

export const usersDal = {
  count: async (query?: string) =>
    await prisma.user.count({
      ...(query && {
        where: {
          OR: [
            { email: { contains: query, mode: "insensitive" } },
            {
              profile: {
                OR: [
                  { firstName: { contains: query, mode: "insensitive" } },
                  { lastName: { contains: query, mode: "insensitive" } },
                  { phoneNumber: { contains: query } },
                ],
              },
            },
          ],
        },
      }),
    }),

  findAll: async (limit = 20, offset = 0, query?: string) =>
    await prisma.user.findMany({
      take: limit,
      skip: offset,
      include: {
        profile: {
          select: {
            avatar: true,
            firstName: true,
            lastName: true,
            isSeller: true,
            phoneNumber: true,
          },
        },
      },
      ...(query && {
        where: {
          OR: [
            { email: { contains: query, mode: "insensitive" } },
            {
              profile: {
                OR: [
                  { firstName: { contains: query, mode: "insensitive" } },
                  { lastName: { contains: query, mode: "insensitive" } },
                  { phoneNumber: { contains: query } },
                ],
              },
            },
          ],
        },
      }),
    }),

  create: async (data: CreateUserDTO) => await prisma.user.create({ data }),

  findById: async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  updateById: async (id: string, data: PatchUserDTO) =>
    await prisma.user.update({
      where: {
        id,
      },
      data,
    }),
};

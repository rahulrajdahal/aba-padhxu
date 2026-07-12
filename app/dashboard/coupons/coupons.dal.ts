import {
  CouponCreateInput,
  CouponUpdateInput,
} from "@/generated/prisma/client/models";
import { prisma } from "@/prisma/prisma";

export const couponsDal = {
  count: async (query?: string) =>
    await prisma.coupon.count({
      ...(query && {
        where: {
          code: { contains: query, mode: "insensitive" },
        },
      }),
    }),

  create: async (data: CouponCreateInput) =>
    await prisma.coupon.create({ data }),

  findAll: async (limit = 20, offset = 0, query?: string) =>
    await prisma.coupon.findMany({
      take: limit,
      skip: offset,
      ...(query && {
        where: {
          code: { contains: query, mode: "insensitive" },
        },
      }),
    }),

  findById: async (id: string) =>
    await prisma.coupon.findUnique({ where: { id } }),

  findByCode: async (code: string) =>
    await prisma.coupon.findUnique({ where: { code } }),

  updateById: async (id: string, data: CouponUpdateInput) =>
    await prisma.coupon.update({ where: { id }, data }),

  deleteById: async (id: string) =>
    await prisma.coupon.delete({ where: { id } }),
};

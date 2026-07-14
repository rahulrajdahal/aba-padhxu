import "server-only";

import { DiscountType } from "@/generated/prisma/client/enums";
import {
  CouponCreateInput,
  CouponUpdateInput,
} from "@/generated/prisma/client/models";
import { prisma } from "@/prisma/prisma";

export const couponsDal = {
  count: async (query?: string, discountType?: DiscountType) =>
    await prisma.coupon.count({
      where: {
        ...(query && {
          code: { contains: query, mode: "insensitive" },
        }),
        ...(discountType && { discountType }),
      },
    }),

  create: async (data: CouponCreateInput) =>
    await prisma.coupon.create({ data }),

  findAll: async (
    limit = 20,
    offset = 0,
    query?: string,
    discountType?: DiscountType,
  ) =>
    await prisma.coupon.findMany({
      take: limit,
      skip: offset,
      where: {
        ...(query && {
          code: { contains: query, mode: "insensitive" },
        }),
        ...(discountType && { discountType }),
      },
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

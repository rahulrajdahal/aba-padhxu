import "server-only";

import { DiscountType } from "@/generated/prisma/client/enums";
import {
  CouponCreateInput,
  CouponUpdateInput,
} from "@/generated/prisma/client/models";
import { couponsDal } from "./coupons.dal";

export const couponsService = {
  count: async (query?: string, discountType?: DiscountType) =>
    await couponsDal.count(query, discountType),

  create: async (data: CouponCreateInput) => {
    const coupon = await couponsDal.create(data);
    return coupon.id;
  },

  findById: async (id: string) => await couponsDal.findById(id),

  findByCode: async (code: string) => await couponsDal.findByCode(code),

  findAll: async (
    limit: number,
    offset: number,
    query?: string,
    discountType?: DiscountType,
  ) => await couponsDal.findAll(limit, offset, query, discountType),

  updateById: async (id: string, data: CouponUpdateInput) =>
    await couponsDal.updateById(id, data),

  deleteById: async (id: string) => await couponsDal.deleteById(id),
};

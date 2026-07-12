import {
  CouponCreateInput,
  CouponUpdateInput,
} from "@/generated/prisma/client/models";
import { couponsDal } from "./coupons.dal";

export const couponsService = {
  count: async (query?: string) => await couponsDal.count(query),

  create: async (data: CouponCreateInput) => {
    const coupon = await couponsDal.create(data);
    return coupon.id;
  },

  findById: async (id: string) => await couponsDal.findById(id),

  findByCode: async (code: string) => await couponsDal.findByCode(code),

  findAll: async (limit: number, offset: number, query?: string) =>
    await couponsDal.findAll(limit, offset, query),

  updateById: async (id: string, data: CouponUpdateInput) =>
    await couponsDal.updateById(id, data),

  deleteById: async (id: string) => await couponsDal.deleteById(id),
};

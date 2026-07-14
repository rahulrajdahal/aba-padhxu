import "server-only";

import { DiscountType } from "@/generated/prisma/client/enums";
import z from "zod";

export const addCouponSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discountType: z.enum(Object.values(DiscountType)),
  discountValuePennies: z.number().min(1, "Discount value is required"),
  expiresAt: z.date().min(new Date(), "Expiry date must be in the future"),
  maxUses: z.number().min(1, "Max uses is required"),
  isActive: z.boolean().optional(),
});

export const updateCouponSchema = addCouponSchema.partial();

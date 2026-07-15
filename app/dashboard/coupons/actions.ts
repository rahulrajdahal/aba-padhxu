"use server";

import { authUserId } from "@/app/(auth)/middleware";
import { Coupon } from "@/generated/prisma/client/client";
import { DiscountType } from "@/generated/prisma/client/enums";
import {
  adminActionWrapper,
  conflictError,
  createdResponse,
  forbiddenError,
  noContentResponse,
  okResponse,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { couponExists } from "./coupons.middleware";
import { couponsService } from "./coupons.service";
import { addCouponSchema, updateCouponSchema } from "./coupons.validation";

export const addCoupon = adminActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const body = {
      code: formData.get("code") as string,
      discountType: formData.get("discountType") as DiscountType,
      discountValuePennies: Number(formData.get("discountValuePennies")),
      expiresAt: new Date(formData.get("expiresAt") as string),
      maxUses: Number(formData.get("maxUses")),
      isActive: Boolean(formData.get("isActive")),
    };

    const validateBody = addCouponSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    if (await couponExists(validateBody.data.code)) {
      return conflictError("Coupon code already exists");
    }

    const coupon = await couponsService.create(validateBody.data);

    revalidatePath(`${routes.dashboard}${routes.coupons}`);
    return createdResponse("Coupon added successfully", coupon);
  },
);

export const fetchCouponsCount = adminActionWrapper(
  async (query?: string, discountType?: DiscountType) => {
    const couponCount = await couponsService.count(query, discountType);

    return okResponse("Coupons count fetched successfully", couponCount);
  },
);

export const fetchAllCoupons = adminActionWrapper(
  async (
    limit: number,
    offset: number,
    query?: string,
    discountType?: DiscountType,
  ) => {
    const coupons = await couponsService.findAll(
      limit,
      offset,
      query,
      discountType,
    );

    return okResponse("Coupons fetched successfully", coupons);
  },
);

export const fetchCouponById = adminActionWrapper(async (id: string) => {
  const coupon = await couponsService.findById(id);

  return okResponse("Coupon fetched successfully", coupon);
});

export const updateCouponById = adminActionWrapper(
  async (id: string, formData: FormData) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const body: Partial<Coupon> = {};

    const code = formData.get("code") as string;
    if (code) {
      body.code = code;
    }

    const discountType = formData.get("discountType") as DiscountType;
    if (discountType) {
      body.discountType = discountType;
    }

    const discountValuePennies = Number(formData.get("discountValuePennies"));
    if (discountValuePennies) {
      body.discountValuePennies = discountValuePennies;
    }

    const expiresAt = formData.get("expiresAt") as string;
    if (expiresAt) {
      body.expiresAt = new Date(expiresAt);
    }

    const maxUses = Number(formData.get("maxUses"));
    if (maxUses) {
      body.maxUses = maxUses;
    }

    const isActive = Boolean(formData.get("isActive"));
    body.isActive = isActive;

    const validateBody = updateCouponSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await couponsService.updateById(id, validateBody.data);

    revalidatePath(`${routes.dashboard}${routes.coupons}`);
    return noContentResponse();
  },
);

export const deleteCouponById = adminActionWrapper(async (id: string) => {
  await couponsService.deleteById(id);

  revalidatePath(`${routes.dashboard}${routes.coupons}`);
  return noContentResponse();
});

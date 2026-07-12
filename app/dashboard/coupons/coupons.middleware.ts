import { couponsService } from "./coupons.service";

export const couponExists = async (code: string) => {
  const coupon = await couponsService.findByCode(code);

  return coupon !== null;
};

export const isCouponActive = async (code: string) => {
  const coupon = await couponsService.findByCode(code);

  if (!coupon) {
    return false;
  }

  return coupon.isActive;
};

export const isCouponExpired = async (code: string) => {
  const coupon = await couponsService.findByCode(code);

  if (!coupon) {
    return false;
  }

  return coupon.expiresAt <= new Date();
};

export const isCouponOverUsed = async (code: string) => {
  const coupon = await couponsService.findByCode(code);

  if (!coupon) {
    return false;
  }

  return coupon.usedCount >= coupon.maxUses;
};

export const isCouponValid = async (code: string) => {
  return (
    (await couponExists(code)) &&
    (await isCouponActive(code)) &&
    !(await isCouponExpired(code)) &&
    !(await isCouponOverUsed(code))
  );
};

import { Coupon } from "@/generated/prisma/client/client";
import { DiscountType } from "@/generated/prisma/client/enums";
import { fetchAllCoupons, fetchCouponsCount } from "./actions";
import Coupons from "./Coupons";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string;
    page: string;
    query?: string;
    discountType?: DiscountType;
  }>;
}) {
  const { limit, page, query, discountType } = await searchParams;

  const currentPage = Number(page) || 1;
  const offset = currentPage * Number(limit) - Number(limit);

  const [{ data }, { data: totalCouponsCount }] = await Promise.all([
    fetchAllCoupons(
      Number(limit || 20),
      Number(offset || 0),
      query,
      discountType,
    ),
    fetchCouponsCount(query, discountType),
  ]);

  return (
    <Coupons
      coupons={data as Coupon[]}
      totalCoupons={totalCouponsCount as number}
    />
  );
}

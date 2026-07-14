import { Coupon } from "@/generated/prisma/client/client";
import { fetchAllCoupons, fetchCouponsCount } from "./actions";
import Coupons from "./Coupons";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ limit?: string; page: string; query?: string }>;
}) {
  const { limit, page, query } = await searchParams;

  const currentPage = Number(page) || 1;
  const offset = currentPage * Number(limit) - Number(limit);

  const [{ data }, { data: totalCouponsCount }] = await Promise.all([
    fetchAllCoupons(Number(limit), offset, query),
    fetchCouponsCount(query),
  ]);

  return (
    <Coupons
      coupons={data as Coupon[]}
      totalCoupons={totalCouponsCount as number}
    />
  );
}

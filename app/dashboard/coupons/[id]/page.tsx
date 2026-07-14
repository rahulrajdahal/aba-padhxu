import { Coupon } from "@/generated/prisma/client/client";
import { notFound } from "next/navigation";
import { fetchCouponById } from "../actions";
import EditCouponPage from "./EditCoupon";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: coupon } = await fetchCouponById(id);

  if (!coupon) return notFound();

  return <EditCouponPage coupon={coupon as Coupon} />;
}

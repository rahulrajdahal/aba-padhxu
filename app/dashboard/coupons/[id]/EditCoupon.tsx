"use client";

import { Button, Input, Select, Switch } from "@/components";
import { Coupon } from "@/generated/prisma/client/client";
import { DiscountType } from "@/generated/prisma/client/enums";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateCouponById } from "../actions";

type EditCouponPageProps = { coupon: Coupon };

export default function EditCouponPage({ coupon }: EditCouponPageProps) {
  const handleUpdateCoupon = async (prevState: unknown, formData: FormData) => {
    const state = await updateCouponById(coupon.id, formData);
    if (state.type === "success") {
      toast.success("Coupon updated!");
      redirect(`${routes.dashboard}${routes.coupons}`);
    }
    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleUpdateCoupon,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        name="code"
        label="Code"
        defaultValue={coupon.code}
        errors={state?.errors?.code}
      />
      <Select
        name="discountType"
        label="Discount Type"
        defaultValue={coupon.discountType}
        options={[
          { label: "Select Discount Type", value: "" },
          ...Object.entries(DiscountType).map(([key, value]) => ({
            label: key,
            value,
          })),
        ]}
        errors={state?.errors?.discountType}
      />

      <Input
        type="number"
        name="discountValuePennies"
        defaultValue={coupon.discountValuePennies}
        errors={state?.errors?.discountValuePennies}
        label="Discount Value"
      />
      <Input
        type="date"
        label="Expires At"
        name="expiresAt"
        value={coupon.expiresAt.toISOString().split("T")[0]}
        errors={state?.errors?.expiresAt}
      />
      <Switch
        name="isActive"
        label="Is Coupon Active?"
        defaultChecked={coupon.isActive}
        errors={state?.errors?.isActive}
      />
      <Input
        name="maxUses"
        type="number"
        label="Max Uses"
        defaultValue={coupon.maxUses}
        errors={state?.errors?.maxUses}
      />

      <Button type="submit" isLoading={isPending}>
        {isPending ? "Updating..." : "Update Coupon"}
      </Button>
    </form>
  );
}

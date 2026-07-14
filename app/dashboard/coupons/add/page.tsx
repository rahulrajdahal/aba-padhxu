"use client";

import { Button, Input, Select, Switch } from "@/components";
import { DiscountType } from "@/generated/prisma/client/enums";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { addCoupon } from "../actions";

export default function AddCouponPage() {
  const handleAddCoupon = async (prevState: unknown, formData: FormData) => {
    const state = await addCoupon(prevState, formData);
    if (state.type === "success") {
      toast.success(state.message);
      redirect(`${routes.dashboard}${routes.coupons}`);
    }
    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(handleAddCoupon, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input name="code" errors={state?.errors?.code} label="Code" />
      <Select
        name="discountType"
        label="Discount Type"
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
        errors={state?.errors?.discountValuePennies}
        label="Discount Value"
      />
      <Input
        type="date"
        label="Expires At"
        name="expiresAt"
        errors={state?.errors?.expiresAt}
      />
      <Switch
        name="isActive"
        label="Is Coupon Active?"
        errors={state?.errors?.isActive}
      />
      <Input
        name="maxUses"
        type="number"
        label="Max Uses"
        errors={state?.errors?.maxUses}
      />

      <Button type="submit" isLoading={isPending}>
        {isPending ? "Adding..." : "Add Coupon"}
      </Button>
    </form>
  );
}

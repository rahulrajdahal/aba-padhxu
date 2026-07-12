"use client";

import {
  addUserAddress,
  updateUserAddress,
} from "@/app/dashboard/user_addresses/actions";
import { Button, Input } from "@/components";
import { UserAddress } from "@/generated/prisma/client/client";
import { AddressType } from "@/generated/prisma/client/enums";
import { useActionState } from "react";
import toast from "react-hot-toast";

type AddShippingProps = { isEdit?: boolean };
type UpdateShippingProps = { isEdit: boolean; shippingAddress: UserAddress };

type ShippingFormProps = AddShippingProps | UpdateShippingProps;

export default function ShippingForm({
  isEdit = false,
  ...props
}: ShippingFormProps) {
  const isUpdate = "shippingAddress" in props;

  const handleShippingForm = async (prevState: unknown, formData: FormData) => {
    if (!isUpdate) {
      formData.set("type", AddressType.SHIPPING);
    }

    const state = isUpdate
      ? await updateUserAddress(props.shippingAddress.id, formData)
      : await addUserAddress(prevState, formData);

    if (state.type === "success") {
      toast.success(
        isUpdate ? "User Shipping Address Updated!" : state.message,
      );
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleShippingForm,
    null,
  );

  return (
    <form action={formAction} className="grid grid-cols-1 md:grid-cols-6 gap-6">
      <Input
        label="Recipient Name"
        name="recipientName"
        placeholder="Full Name or Business Entity"
        wrapperClassName="md:col-span-full"
        errors={state?.errors?.recipientName}
        defaultValue={isUpdate ? props.shippingAddress.recipientName : ""}
      />
      <Input
        label="Street Address"
        name="addressLine1"
        placeholder="123 Main St"
        wrapperClassName="md:col-span-4"
        errors={state?.errors?.addressLine1}
        defaultValue={isUpdate ? props.shippingAddress.addressLine1 : ""}
      />

      <Input
        label="Apt, Suite, Unit (Opt)"
        name="addressLine2"
        placeholder="Apt 4B"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.addressLine2}
        defaultValue={
          isUpdate ? (props?.shippingAddress?.addressLine2 ?? "") : ""
        }
      />

      <Input
        label="City"
        name="city"
        placeholder="New York"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.city}
        defaultValue={isUpdate ? props.shippingAddress.city : ""}
      />

      <Input
        label="State / Province"
        name="stateProvince"
        placeholder="NY"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.stateProvince}
        defaultValue={isUpdate ? props.shippingAddress.stateProvince : ""}
      />

      <Input
        label="ZIP / Postal Code"
        name="postalCode"
        placeholder="10001"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.postalCode}
        defaultValue={isUpdate ? props.shippingAddress.postalCode : ""}
      />

      <Input
        label="Country ISO Code"
        name="countryCode"
        placeholder="US"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.countryCode}
        defaultValue={isUpdate ? props.shippingAddress.countryCode : ""}
      />

      <div className="md:col-span-4 flex items-center pt-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isDefault"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            defaultChecked={isUpdate && props.shippingAddress.isDefault}
          />
          <span className="text-sm font-medium text-gray-700">
            Set as my default address fallback
          </span>
        </label>
      </div>

      <div className="md:col-span-full mt-4">
        <Button type="submit" isLoading={isPending}>
          {isUpdate
            ? isPending
              ? "Updating..."
              : "Update Address"
            : isPending
              ? "Adding..."
              : "Add Address"}
        </Button>
      </div>
    </form>
  );
}

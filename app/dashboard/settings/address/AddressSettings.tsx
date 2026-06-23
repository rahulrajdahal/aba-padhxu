"use client";

import { Button, Input } from "@/components";
import { AddressType } from "@/generated/prisma/client/enums";
import { useActionState } from "react";

type AddressSettings = {
  address?: {
    recipientName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateProvince?: string;
    postalCode?: string;
    countryCode?: string;
    isDefault?: boolean;
    type?: AddressType;
  };
};
export default function AddressSettings({ address }: AddressSettings) {
  const handleUpdateUserAddress = () => {};

  const [state, formAction, isPending] = useActionState(
    handleUpdateUserAddress,
    null,
  );

  return (
    <form action={formAction} className="grid grid-cols-1 md:grid-cols-6 gap-6">
      <Input
        name="type"
        label={AddressType.BILLING}
        type="radio"
        defaultChecked={address?.type === AddressType.BILLING}
        errors={state?.errors?.type}
      />
      <Input
        name="type"
        label={AddressType.SHIPPING}
        type="radio"
        defaultChecked={address?.type === AddressType.SHIPPING}
        errors={state?.errors?.type}
      />

      <Input
        label="Recipient Name"
        name="recipientName"
        placeholder="Full Name or Business Entity"
        wrapperClassName="md:col-span-full"
        errors={state?.errors?.recipientName}
        defaultValue={address?.recipientName}
      />
      <Input
        label="Street Address"
        name="addressLine1"
        placeholder="123 Main St"
        wrapperClassName="md:col-span-4"
        errors={state?.errors?.addressLine1}
        defaultValue={address?.addressLine1}
      />

      <Input
        label="Apt, Suite, Unit (Opt)"
        name="addressLine2"
        placeholder="Apt 4B"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.addressLine2}
        defaultValue={address?.addressLine2}
      />

      <Input
        label="City"
        name="city"
        placeholder="New York"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.city}
        defaultValue={address?.city}
      />

      <Input
        label="State / Province"
        name="stateProvince"
        placeholder="NY"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.stateProvince}
        defaultValue={address?.stateProvince}
      />

      <Input
        label="ZIP / Postal Code"
        name="postalCode"
        placeholder="10001"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.postalCode}
        defaultValue={address?.postalCode}
      />

      <Input
        label="Country ISO Code"
        name="countryCode"
        placeholder="US"
        wrapperClassName="md:col-span-2"
        errors={state?.errors?.countryCode}
        defaultValue={address?.countryCode}
      />

      <div className="md:col-span-4 flex items-center pt-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isDefault"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            errors={state?.errors?.isDefault}
            defaultChecked={address?.isDefault}
          />
          <span className="text-sm font-medium text-gray-700">
            Set as my default address fallback
          </span>
        </label>
      </div>

      <div className="md:col-span-full mt-4">
        <Button type="submit" isLoading={isPending}>
          {isPending ? "Updating..." : "Update Address"}
        </Button>
      </div>
    </form>
  );
}

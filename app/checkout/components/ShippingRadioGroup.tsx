"use client";

import { UserAddress } from "@/generated/prisma/client/client";
import { useState } from "react";
import ShippingRadio from "./ShippingRadio";

type ShippingRadioGroupProps = {
  shippingAddresses: UserAddress[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
};

export default function ShippingRadioGroup({
  shippingAddresses,
  selectedAddressId,
  setSelectedAddressId,
}: ShippingRadioGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      {shippingAddresses?.map((shippingAddress) => (
        <ShippingRadio
          key={shippingAddress.id}
          isSelected={selectedAddressId === shippingAddress.id}
          shippingAddress={shippingAddress}
          setSelectedAddress={setSelectedAddressId}
        />
      ))}
    </div>
  );
}

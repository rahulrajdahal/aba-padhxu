"use client";

import { UserAddress } from "@/generated/prisma/client/client";
import { useState } from "react";
import ShippingRadio from "./ShippingRadio";

type ShippingRadioGroupProps = {
  shippingAddresses: UserAddress[];
};

export default function ShippingRadioGroup({
  shippingAddresses,
}: ShippingRadioGroupProps) {
  const [selectedAddress, setSelectedAddress] = useState(
    shippingAddresses.find((shippingAddress) => shippingAddress.isDefault)
      ?.id || shippingAddresses[0],
  );

  return (
    <div className="flex flex-col gap-4">
      {shippingAddresses?.map((shippingAddress) => (
        <ShippingRadio
          key={shippingAddress.id}
          isSelected={selectedAddress === shippingAddress.id}
          shippingAddress={shippingAddress}
          setSelectedAddress={setSelectedAddress}
        />
      ))}
    </div>
  );
}

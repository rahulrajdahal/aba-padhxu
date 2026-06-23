"use client";

import { UserAddress } from "@/generated/prisma/client/client";
import AddAddressForm from "./components/AddAddressForm";
import UpdateAddressForm from "./components/UpdateAddressForm";

type AddressSettings = {
  addresses?: UserAddress[];
};
export default function AddressSettings({ addresses }: AddressSettings) {
  return (
    <div className="flex flex-col gap-10">
      <AddAddressForm />
      <hr className="border-gray-200" />
      {addresses?.map((address) => (
        <>
          <UpdateAddressForm key={address.id} address={address} />
          <hr className="border-gray-200" />
        </>
      ))}
    </div>
  );
}

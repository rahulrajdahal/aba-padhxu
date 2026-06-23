"use client";

import { UserAddress } from "@/generated/prisma/client/client";
import AddAddressForm from "./components/AddAddressForm";
import AddressForm from "./components/UpdateAddressForm";

type AddressSettings = {
  addresses?: UserAddress[];
};
export default function AddressSettings({ addresses }: AddressSettings) {
  return (
    <>
      <AddAddressForm />

      {addresses?.map((address) => (
        <AddressForm key={address.id} address={address} />
      ))}
    </>
  );
}

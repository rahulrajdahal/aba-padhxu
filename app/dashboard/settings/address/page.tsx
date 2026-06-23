import { fetchUserAddresses } from "@/app/dashboard/user_addresses/actions";
import { UserAddress } from "@/generated/prisma/client/client";
import AddressSettings from "./AddressSettings";

export default async function page() {
  const { data } = await fetchUserAddresses();

  return <AddressSettings addresses={data as UserAddress[]} />;
}

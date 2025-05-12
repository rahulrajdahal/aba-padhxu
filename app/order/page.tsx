import { UserPageLayout } from "@/components";
import { cookies } from "next/headers";
import { getNavbarProps } from "../auth/actions";
import Order from "./Order";

export default async function page() {
  const cartItems = (await cookies()).get("cartItems")?.value
    ? JSON.parse((await cookies()).get("cartItems")?.value as string)
    : [];

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  const navbarProps = await getNavbarProps();

  return (
    <UserPageLayout navbarProps={navbarProps}>
      <Order cartItems={cartItems} />
    </UserPageLayout>
  );
}

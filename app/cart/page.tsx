import { UserPageLayout } from "@/components";
import { cookies } from "next/headers";
import { getNavbarProps } from "../auth/actions";
import { verifySession } from "../auth/dal";
import Cart from "./Cart";

export default async function page() {
  const cartItems = (await cookies()).get("cartItems")?.value
    ? JSON.parse((await cookies()).get("cartItems")?.value as string)
    : [];

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  const navbarProps = await getNavbarProps();

  const { isAuth } = await verifySession();

  return (
    <UserPageLayout navbarProps={navbarProps}>
      <Cart cartItems={cartItems} isAuth={isAuth} />
    </UserPageLayout>
  );
}

import { UserPageLayout } from "@/components";
import { cookies } from "next/headers";

export default async function page() {
  const cartItems = (await cookies()).get("cartItems")?.value
    ? JSON.parse((await cookies()).get("cartItems")?.value as string)
    : [];

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <UserPageLayout>
      Cart page
      {/* <Cart cartItems={cartItems} isAuth={isAuth} /> */}
    </UserPageLayout>
  );
}

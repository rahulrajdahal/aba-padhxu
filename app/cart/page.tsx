import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import Cart from "./Cart";
import { cartItemsCount, fetchUserCartItems } from "./cartItems/actions";

export default async function page() {
  const [{ data }, { data: cartCount }] = await Promise.all([
    fetchUserCartItems(),
    cartItemsCount(),
  ]);

  return (
    <Cart
      cartItems={
        data as (CartItem & {
          listing: Listing & { book: Book };
        })[]
      }
      cartCount={Number(cartCount)}
    />
  );
}

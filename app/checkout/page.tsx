import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import { cartItemsCount, fetchUserCartItems } from "../cart/cartItems/actions";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import CheckoutPage from "./Checkout";

export default async function page() {
  const [{ data }, { data: cartCount }, { data: wishlistItemsCount }] =
    await Promise.all([
      fetchUserCartItems(),
      cartItemsCount(),
      fetchUserWishlistItemsCount(),
    ]);

  return (
    <CheckoutPage
      cartItems={data as (CartItem & { listing: Listing & { book: Book } })[]}
      cartCount={Number(cartCount)}
      wishlistCount={Number(wishlistItemsCount)}
    />
  );
}

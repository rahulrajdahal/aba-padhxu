import { PublicPageLayout } from "@/components/layouts";
import { Book, CartItem, Listing } from "@/generated/prisma/client/client";
import { isAuthenticated } from "../(auth)/middleware";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import Cart from "./Cart";
import { cartItemsCount, fetchUserCartItems } from "./cartItems/actions";

export default async function page() {
  const [isAuth, { data }, { data: cartCount }, { data: wishlistItemsCount }] =
    await Promise.all([
      isAuthenticated(),
      fetchUserCartItems(),
      cartItemsCount(),
      fetchUserWishlistItemsCount(),
    ]);

  return (
    <PublicPageLayout
      isAuth={isAuth}
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistItemsCount)}
    >
      <Cart
        cartItems={
          data as (CartItem & {
            listing: Listing & { book: Book };
          })[]
        }
      />
    </PublicPageLayout>
  );
}

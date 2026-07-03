import { Book, Wishlist } from "@/generated/prisma/client/client";
import { cartItemsCount } from "../cart/cartItems/actions";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import WishlistPage from "./Wishlist";
import { fetchUserWishlistWithBooks } from "./actions";

export default async function page() {
  const [{ data }, { data: cartCount }, { data: wishlistItemsCount }] =
    await Promise.all([
      fetchUserWishlistWithBooks(),
      cartItemsCount(),
      fetchUserWishlistItemsCount(),
    ]);

  return (
    <WishlistPage
      wishlistItems={data as (Wishlist & { book: Book })[]}
      cartCount={Number(cartCount)}
      wishlistCount={Number(wishlistItemsCount)}
    />
  );
}

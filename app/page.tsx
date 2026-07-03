import { Book, Listing } from "@/generated/prisma/client/client";
import { fetchAllListings } from "./actions";
import { cartItemsCount } from "./cart/cartItems/actions";
import { fetchUserWishlistItemsCount } from "./dashboard/wishlists/actions";
import Home from "./Home";

export default async function page() {
  const { data } = await fetchAllListings();
  const { data: cartCount } = await cartItemsCount();
  const { data: wishlistItemsCount } = await fetchUserWishlistItemsCount();

  return (
    <Home
      listings={data as (Listing & { book: Book })[]}
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistItemsCount as number}
    />
  );
}

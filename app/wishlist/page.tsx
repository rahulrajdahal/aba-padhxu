import { PublicPageLayout } from "@/components/layouts";
import { isAuthenticated } from "../(auth)/middleware";
import { cartItemsCount } from "../cart/cartItems/actions";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import { WishlistWithBookAndGenreName } from "../dashboard/wishlists/wishlists.dto";
import WishlistPage from "./Wishlist";
import { fetchUserWishlistWithBooksAndGenreName } from "./actions";

export default async function page() {
  const [{ data }, { data: cartCount }, { data: wishlistItemsCount }, isAuth] =
    await Promise.all([
      fetchUserWishlistWithBooksAndGenreName(),
      cartItemsCount(),
      fetchUserWishlistItemsCount(),
      isAuthenticated(),
    ]);

  return (
    <PublicPageLayout
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistItemsCount)}
      isAuth={isAuth}
    >
      <WishlistPage wishlistItems={data as WishlistWithBookAndGenreName[]} />
    </PublicPageLayout>
  );
}

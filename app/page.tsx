import { PublicPageLayout } from "@/components/layouts";
import {
  Book,
  Genre,
  Listing,
  Wishlist,
} from "@/generated/prisma/client/client";
import { Suspense } from "react";
import { isAuthenticated } from "./(auth)/middleware";
import { fetchAllGenresWithBookCount, fetchAllListings } from "./actions";
import { cartItemsCount } from "./cart/cartItems/actions";
import { Categories, FeaturedBooks, Header, Listings } from "./components";
import ListingsSkeleton from "./components/ListingsSkeleton";
import { fetchUserWishlistItemsCount } from "./dashboard/wishlists/actions";

export default async function page() {
  const [
    { data },
    { data: genres },
    { data: cartCount },
    { data: wishlistItemsCount },
    isAuth,
  ] = await Promise.all([
    fetchAllListings(),
    fetchAllGenresWithBookCount(4),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
    isAuthenticated(),
  ]);

  return (
    <PublicPageLayout
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistItemsCount as number}
      isAuth={isAuth}
    >
      <Header />
      <Categories genres={genres as Genre[]} />
      <FeaturedBooks />
      <Suspense fallback={<ListingsSkeleton />}>
        <Listings
          listings={
            data as (Listing & {
              book: Book & { wishlistItems: Wishlist[] };
            })[]
          }
        />
      </Suspense>
    </PublicPageLayout>
  );
}

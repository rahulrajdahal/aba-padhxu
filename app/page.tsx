import { PublicPageLayout } from "@/components/layouts";
import { Book, Listing, Wishlist } from "@/generated/prisma/client/client";
import { Suspense } from "react";
import { fetchAllListings } from "./actions";
import { cartItemsCount } from "./cart/cartItems/actions";
import { Categories, FeaturedBooks, Header, Listings } from "./components";
import ListingsSkeleton from "./components/ListingsSkeleton";
import { fetchUserWishlistItemsCount } from "./dashboard/wishlists/actions";

export default async function page() {
  const [{ data }, { data: cartCount }, { data: wishlistItemsCount }] =
    await Promise.all([
      fetchAllListings(),
      cartItemsCount(),
      fetchUserWishlistItemsCount(),
    ]);

  return (
    <PublicPageLayout
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistItemsCount as number}
    >
      <div className="min-h-screen bg-primary-50 text-gray-900 font-sans">
        <Header />
        <Categories />
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
      </div>
    </PublicPageLayout>
  );
}

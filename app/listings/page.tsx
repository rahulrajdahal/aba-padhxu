import { PublicPageLayout } from "@/components/layouts";
import { isAuthenticated } from "../(auth)/middleware";
import { fetchAllListingsWithBookAndGenreName } from "../actions";
import { cartItemsCount } from "../cart/cartItems/actions";
import { fetchAllListingsCount } from "../dashboard/listings/actions";
import { ListingWithBookAndGenreName } from "../dashboard/listings/listings.dto";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import Listings from "./Listings";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [x: string]: string | undefined }>;
}) {
  const { limit, page, query, genre, condition } = await searchParams;

  const currentPage = Number(page) || 1;
  const limitNum = Number(limit) || 20;
  const offset = currentPage * limitNum - limitNum;

  const [
    { data },
    { data: totalListingsCount },
    { data: cartCount },
    { data: wishlistCount },
    isAuth,
  ] = await Promise.all([
    fetchAllListingsWithBookAndGenreName(
      limitNum,
      offset,
      query,
      genre,
      condition,
    ),
    fetchAllListingsCount(query, genre, condition),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
    isAuthenticated(),
  ]);
  return (
    <PublicPageLayout
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistCount as number}
      isAuth={isAuth}
    >
      <Listings
        listings={data as ListingWithBookAndGenreName[]}
        totalListingsCount={totalListingsCount as number}
      />
    </PublicPageLayout>
  );
}

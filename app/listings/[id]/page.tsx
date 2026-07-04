import { authUserId } from "@/app/(auth)/middleware";
import { cartItemsCount } from "@/app/cart/cartItems/actions";
import { fetchListingByIdWithBookAndSeller } from "@/app/dashboard/listings/actions";
import { fetchUserWishlistItemsCount } from "@/app/dashboard/wishlists/actions";
import { PublicPageLayout } from "@/components/layouts";
import { Book, Listing, UserProfile } from "@/generated/prisma/client/client";
import ListingDetail from "./ListingDetail";

export default async function page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;

  const [
    { data },
    { data: cartCount },
    { data: wishlistItemsCount },
    currentUserId,
  ] = await Promise.all([
    fetchListingByIdWithBookAndSeller(id),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
    authUserId(),
  ]);

  return (
    <PublicPageLayout
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistItemsCount as number}
    >
      <ListingDetail
        listing={
          data as Listing & {
            book: Book;
            seller: Pick<UserProfile, "firstName" | "lastName">;
          }
        }
        currentUserId={currentUserId as string}
      />
    </PublicPageLayout>
  );
}

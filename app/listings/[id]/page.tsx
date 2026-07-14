import { authUserId, isAuthenticated } from "@/app/(auth)/middleware";
import { cartItemsCount } from "@/app/cart/cartItems/actions";
import { fetchListingByIdWithBookAndSeller } from "@/app/dashboard/listings/actions";
import { fetchUserWishlistItemsCount } from "@/app/dashboard/wishlists/actions";
import { PublicPageLayout } from "@/components/layouts";
import {
  Book,
  Listing,
  User,
  UserProfile,
} from "@/generated/prisma/client/client";
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
    isAuth,
  ] = await Promise.all([
    fetchListingByIdWithBookAndSeller(id),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
    authUserId(),
    isAuthenticated(),
  ]);

  return (
    <PublicPageLayout
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistItemsCount as number}
      isAuth={isAuth as boolean}
    >
      <ListingDetail
        listing={
          data as Listing & {
            book: Book;
            seller: User & {
              profile: Pick<UserProfile, "firstName" | "lastName">;
            };
          }
        }
        currentUserId={currentUserId as string}
        isAuth={isAuth as boolean}
      />
    </PublicPageLayout>
  );
}

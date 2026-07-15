import { PublicPageLayout } from "@/components/layouts";
import { Genre } from "@/generated/prisma/client/client";
import { isAuthenticated } from "../(auth)/middleware";
import { fetchAllGenresWithBookCount } from "../actions";
import { cartItemsCount } from "../cart/cartItems/actions";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import Genres from "./Genres";
import { fetchGenresCount } from "./actions";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    limit?: number;
  }>;
}) {
  const [
    { data: genres },
    { data: genresCount },
    isAuth,
    { data: cartCount },
    { data: wishlistItemsCount },
  ] = await Promise.all([
    fetchAllGenresWithBookCount(2),
    fetchGenresCount(),
    isAuthenticated(),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
  ]);

  return (
    <PublicPageLayout
      cartItemsCount={cartCount as number}
      wishlistItemsCount={wishlistItemsCount as number}
      isAuth={isAuth}
    >
      <Genres
        genres={genres as (Genre & { _count: { books: number } })[]}
        totalGenres={genresCount as number}
      />
    </PublicPageLayout>
  );
}

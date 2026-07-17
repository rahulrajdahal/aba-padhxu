import { PublicPageLayout } from "@/components/layouts";
import { isAuthenticated } from "../(auth)/middleware";
import { cartItemsCount } from "../cart/cartItems/actions";
import { fetchBooksCount } from "../dashboard/books/actions";
import { BookWithGenreName } from "../dashboard/books/books.dto";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import { fetchAllBooks } from "./actions";
import Books from "./Books";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [x: string]: string;
  }>;
}) {
  const { limit, page, query, genre } = await searchParams;

  const currentPage = Number(page) || 1;
  const limitNum = Number(limit) || 20;
  const offset = currentPage * limitNum - limitNum;

  const [
    { data },
    { data: totalBooksCount },
    { data: cartCount },
    { data: wishlistCount },
    isAuth,
  ] = await Promise.all([
    fetchAllBooks(limitNum, offset, query, genre),
    fetchBooksCount(query, genre),
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
      <Books
        books={data as BookWithGenreName[]}
        totalBooksCount={totalBooksCount as number}
      />
    </PublicPageLayout>
  );
}

import { isAdmin } from "@/app/(auth)/middleware";
import { fetchBooksCount } from "./books/actions";
import Dashboard from "./Dashboard";
import { fetchGenresCount } from "./genres/actions";
import {
  fetchAllListingsCount,
  fetchSellerListingCount,
} from "./listings/actions";

export default async function page() {
  const admin = await isAdmin();

  const [{ data }, { data: BooksCount }, { data: GenresCount }] =
    await Promise.all([
      admin ? fetchAllListingsCount() : fetchSellerListingCount(),
      fetchBooksCount(),
      fetchGenresCount(),
    ]);

  return (
    <Dashboard
      ordersPendingCount={0}
      ordersDeliveredCount={0}
      ordersCompletedCount={0}
      booksCount={BooksCount as number}
      genresCount={GenresCount as number}
      listingsCount={data as number}
    />
  );
}

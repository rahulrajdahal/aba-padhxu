import { Book, Listing } from "@/generated/prisma/client/client";
import { BookCondition } from "@/generated/prisma/client/enums";
import { fetchSellerListingCount, fetchSellerListings } from "./actions";
import Listings from "./Listings";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    limit?: number;
    condition?: BookCondition;
  }>;
}) {
  const { limit, page, query, condition } = await searchParams;

  const currentPage = Number(page) || 1;
  const offset = currentPage * Number(limit) - Number(limit);

  const [{ data }, { data: totalCount }] = await Promise.all([
    fetchSellerListings(
      Number(limit || 20),
      Number(offset || 0),
      query,
      condition,
    ),
    fetchSellerListingCount(query, condition),
  ]);

  return (
    <Listings
      listings={data as (Listing & { book: Pick<Book, "title"> })[]}
      totalListings={totalCount as number}
    />
  );
}

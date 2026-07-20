"use client";

import { GenreSelect } from "@/components";
import ConditionSelect from "@/components/ConditionSelect";
import Empty from "@/components/Empty/Empty";
import SearchInput from "@/components/SearchInput/SearchInput";
import TableFooter from "@/components/TablePage/TableFooter";
import { Bag } from "@meistericons/react";
import { Suspense } from "react";
import { CardSkeleton } from "../components";
import { ListingWithBookAndGenreName } from "../dashboard/listings/listings.dto";
import ListingCard from "./components/ListingCard/ListingCard";

interface ListingsProps {
  listings: ListingWithBookAndGenreName[];
  totalListingsCount: number;
}

export default function ListingsPage({
  listings,
  totalListingsCount,
}: ListingsProps) {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div>
        <div className="mb-6 flex items-center gap-4">
          <SearchInput
            label="Search Listings"
            placeholder="Search by title, author, or ISBN..."
          />
          <GenreSelect />
          <ConditionSelect />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center place-items-center justify-center justify-items-center">
          <Suspense
            fallback={Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          >
            {listings?.length > 0 ? (
              listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  author={listing.author}
                  bookId={listing.bookId}
                  genre={listing.genre}
                  image={listing.image}
                  title={listing.title}
                  id={listing.id}
                  pricePennies={listing.pricePennies}
                  // inWishlist={listing.inWishlist}
                />
              ))
            ) : (
              <Empty
                icon={<Bag size={128} />}
                title="No listings found"
                message="Couldn't find any listings, check back later!"
                className="col-span-full"
              />
            )}
          </Suspense>
        </div>
        <TableFooter totalItems={totalListingsCount} />
      </div>
    </main>
  );
}

import { BookCard } from "@/components";
import { Book, Listing, Wishlist } from "@/generated/prisma/client/client";

interface ListingsProps {
  listings: (Listing & { book: Book & { wishlistItems: Wishlist[] } })[];
}

export default function Listings({ listings }: Readonly<ListingsProps>) {
  return (
    <section
      id="listings"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {listings.map((listing) => (
          <BookCard listing={listing} key={listing.id} />
        ))}
      </div>
    </section>
  );
}

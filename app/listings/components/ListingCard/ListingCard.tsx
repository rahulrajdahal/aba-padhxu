import BookCardAuthor from "@/components/BookCard/BookCardAuthor/BookCardAuthor";
import BookCardRating from "@/components/BookCard/BookCardRating/BookCardRating";
import BookCardTitle from "@/components/BookCard/BookCardTitle/BookCardTitle";
import PriceBadge from "@/components/BookCard/PriceBadge/PriceBadge";
import WishlistBadge from "@/components/BookCard/WishlistBadge/WishlistBadge";
import { Book, Genre, Listing } from "@/generated/prisma/client/client";
import Link from "next/link";

interface ListingCardProps
  extends
    Pick<Listing, "pricePennies" | "bookId" | "id">,
    Pick<Book, "author" | "image" | "title"> {
  genre: Genre["name"];
  inWishlist?: boolean;
}

export default function ListingCard({
  pricePennies,
  author,
  genre,
  image,
  title,
  id,
  bookId,
  inWishlist = false,
}: ListingCardProps) {
  return (
    <div className="px-5 py-7 flex flex-col w-full gap-2 max-w-70 relative">
      <PriceBadge price={pricePennies / 100} />
      <img
        src={image}
        alt={title}
        width={150}
        height={200}
        className="w-full h-75 rounded-xl object-cover"
      />
      <WishlistBadge bookId={bookId} inWishlist={inWishlist} />

      <div className="flex flex-col gap-4">
        <Link href={`/listings/${id}`}>
          <BookCardTitle title={title} />
          <p className="text-gray-400 text-[0.8125rem] leading-4.5 italic">
            {genre}
          </p>
          <BookCardAuthor author={author} />
          <BookCardRating rating={4.5} />
        </Link>
        {/* <AddToCart listing={listing} /> */}
      </div>
    </div>
  );
}

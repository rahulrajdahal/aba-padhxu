"use client";

import {
  Book,
  Genre,
  Listing,
  Wishlist,
} from "@/generated/prisma/client/client";
import Link from "next/link";
import { AddToCart } from "../Buttons";
import BookCardAuthor from "./BookCardAuthor/BookCardAuthor";
import BookCardRating from "./BookCardRating/BookCardRating";
import BookCardTitle from "./BookCardTitle/BookCardTitle";
import PriceBadge from "./PriceBadge/PriceBadge";
import WishlistBadge from "./WishlistBadge/WishlistBadge";

export default function BookCard({
  listing,
}: Readonly<{
  listing: Pick<Listing, "bookId" | "quantity" | "priceCents" | "id"> & {
    book: Book & { genre: Pick<Genre, "name"> } & { wishlistItems: Wishlist[] };
  };
}>) {
  const { book, id, priceCents, bookId } = listing;

  return (
    <div className="px-5 py-7 flex flex-col w-full gap-2 max-w-70 relative">
      <PriceBadge price={priceCents / 100} />
      <img
        src={book.image}
        alt={book.title}
        width={150}
        height={200}
        className="w-full h-75 rounded-xl object-cover"
      />
      <WishlistBadge
        bookId={bookId}
        inWishlist={book.wishlistItems.some((item) => item.bookId === bookId)}
      />

      <div className="flex flex-col gap-4">
        <Link href={`/listings/${id}`}>
          <BookCardTitle title={book.title} />
          <p className="text-gray-400 text-[0.8125rem] leading-4.5 italic">
            {book.genre.name}
          </p>
          <BookCardAuthor author={book.author} />
          <BookCardRating rating={4.5} />
        </Link>
        <AddToCart listing={listing} />
      </div>
    </div>
  );
}

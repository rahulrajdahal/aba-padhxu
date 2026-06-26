"use client";

import { Book, Listing } from "@/generated/prisma/client/client";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import PriceBadge from "./PriceBadge/PriceBadge";

interface CardProps extends LinkProps {
  imageProps?: ImageProps;
  listing: Pick<Listing, "priceCents"> & {
    book: Pick<Book, "title" | "author" | "image" | "genre">;
  };
}

export default function Card({
  listing,
  imageProps,
  ...props
}: Readonly<CardProps>) {
  return (
    <Link
      {...props}
      className="px-5 py-7 flex flex-col w-full gap-2 max-w-70 rounded-[1.25rem] relative"
    >
      <PriceBadge price={listing.priceCents} />
      <Image
        src={
          process.env.NODE_ENV === "development"
            ? `/uploads/books/${listing.book.image}`
            : listing.book.image
        }
        alt={listing.book.title}
        width={150}
        height={200}
        className="w-full h-75 rounded-xl object-cover"
        {...imageProps}
      />
      <div className="flex flex-col gap-5">
        <div className="">
          <strong className="font-semibold text-lg leading-6 text-gray-900">
            {listing.book.title}
          </strong>
          <p className="mt-1 text-gray-400 text-[0.8125rem] leading-4.5 italic">
            {listing.book.genre}
          </p>
          <p className="mt-1 text-gray-400 text-[0.8125rem] leading-4.5 italic">
            by {listing.book.author}
          </p>
        </div>
        {/* <AddToCart book={book} /> */}
      </div>
    </Link>
  );
}

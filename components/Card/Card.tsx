"use client";

import { Book, Listing } from "@/generated/prisma/client/client";
import { ImageProps } from "next/image";
import Link from "next/link";
import { AddToCart } from "../Buttons";
import PriceBadge from "./PriceBadge/PriceBadge";

interface CardProps {
  imageProps?: ImageProps;
  listing: Pick<Listing, "id" | "priceCents" | "quantity"> & {
    book: Pick<Book, "title" | "author" | "image" | "genre">;
  };
}

export default function Card({ listing, imageProps }: Readonly<CardProps>) {
  return (
    <div className="px-5 py-7 flex flex-col w-full gap-2 max-w-70 relative">
      <PriceBadge price={listing.priceCents / 100} />
      <img
        src={listing.book.image}
        alt={listing.book.title}
        width={150}
        height={200}
        className="w-full h-75 rounded-xl object-cover"
        {...imageProps}
      />
      <div className="flex flex-col gap-4">
        <Link href={`/book/${listing.id}`}>
          <strong className="font-semibold text-lg leading-6 text-gray-900">
            {listing.book.title.substring(0, 50)}
          </strong>
          <p className="text-gray-400 text-[0.8125rem] leading-4.5 italic">
            {listing.book.genre}
          </p>
          <p className="text-gray-400 text-[0.8125rem] leading-4.5 italic">
            by {listing.book.author}
          </p>
          <span className="mt-1 text-primary-700 px-2 py-1 rounded text-sm font-semibold">
            4.5 ⭐
          </span>
        </Link>
        <AddToCart listing={listing} />
      </div>
    </div>
  );
}

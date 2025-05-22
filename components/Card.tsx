"use client";

import { BookWithAuthorAndGenre } from "@/types";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { AddToCart } from "./Buttons";

interface CardProps extends LinkProps {
  imageProps?: ImageProps;
  book: BookWithAuthorAndGenre;
}

export default function Card({
  book,
  imageProps,
  ...props
}: Readonly<CardProps>) {
  return (
    <Link
      {...props}
      className="px-5 py-7 flex flex-col w-full gap-5 max-w-[17.5rem] rounded-[1.25rem] relative"
    >
      <span className="absolute h-[3.75rem] w-[3.75rem] rounded-full bg-white text-green-700 left-5 top-14 shadow-[-15px_15px_40px_rgba(170,53,0,0.5)] flex items-center justify-center p-[0.1875rem]">
        <p className="-rotate-[38deg] text-[1.75rem] leading-8">
          <sup className="text-sm">$</sup>

          {Number(Number(book.price).toFixed(2))}
        </p>
      </span>
      <Image
        src={
          process.env.NODE_ENV === "development"
            ? `/uploads/books/${book.image}`
            : book.image
        }
        alt={book.name}
        width={150}
        height={200}
        className="w-full h-full max-h-[18.75rem] rounded-xl object-cover"
        {...imageProps}
      />
      <div className="flex flex-col gap-2">
        <div className="">
          <strong className="font-semibold text-lg leading-6 text-gray-900">
            {book.name}
          </strong>
          <p className="mt-1 text-gray-400 text-[0.8125rem] leading-[1.125rem] italic">
            {book.genre?.title ?? "N/A"}
          </p>
          <p className="mt-1 text-gray-400 text-[0.8125rem] leading-[1.125rem] italic">
            by {book.author?.name}
          </p>
        </div>
        <AddToCart book={book} />
      </div>
    </Link>
  );
}

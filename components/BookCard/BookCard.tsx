"use client";

import { addToCart } from "@/app/cart/action";
import { Bookmark, Cart } from "@meistericons/react";
import { Author, Book, Genre } from "@prisma/client";
import parse from "html-react-parser";
import Image from "next/image";
import Button from "../Button/Button";

export default function BookCard({
  book,
}: Readonly<{
  book: Book & { genre: Genre } & { author: Author };
}>) {
  return (
    <div className="rounded-lg border border-gray-400 p-2">
      <Image
        alt={book.name}
        src={
          process.env.NODE_ENV === "development"
            ? `/uploads/books/${book.image}`
            : book.image
        }
        width={100}
        height={150}
        className="h-56 w-full object-cover transition-all hover:scale-105"
      />
      <a href={`/book/${book.id}`} className="mt-4 flex flex-col gap-2">
        <span className="flex items-center justify-between">
          <strong className="text-2xl font-bold">{book.name}</strong>
          <p>${Number(book.price).toFixed(2)}</p>
        </span>
        {book.genre && (
          <span className="flex items-center gap-0.5">
            <Bookmark /> <strong>{book.genre?.title}</strong>
          </span>
        )}
        <p>{parse(book.description)}</p>
        <p className="text-base font-medium">
          Author:&nbsp;{" "}
          <strong className="font-bold text-gray-900">
            {book.author?.name}
          </strong>
        </p>
      </a>
      <Button
        onClick={async () => await addToCart(book.id)}
        className="mt-2 flex gap-2"
      >
        <Cart />
        Add to Cart
      </Button>
    </div>
  );
}

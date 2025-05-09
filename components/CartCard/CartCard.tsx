"use client";

import { updateQty } from "@/app/cart/action";
import { Add, Bookmark, MinusBlock } from "@meistericons/react";
import { Author, Book, Genre } from "@prisma/client";
import parse from "html-react-parser";
import Image from "next/image";
import Button from "../Button/Button";

export default function CartCard({
  book,
  qty,
}: Readonly<{
  book: Book & { genre: Genre } & { author: Author };
  qty: number;
}>) {
  return (
    <div className="flex items-center justify-between gap-2 px-8 py-4">
      <div className="flex items-center gap-4">
        <Image
          alt={book.name}
          src={
            process.env.NODE_ENV === "development"
              ? `/uploads/books/${book.image}`
              : book.image
          }
          width={100}
          height={150}
          className="h-32 w-80 object-cover transition-all hover:scale-105"
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
          <p>{book.quantity - qty}</p>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="!bg-green-400 !px-2 !text-gray-700"
          onClick={async () => {
            if (book.quantity - qty > 0) await updateQty(book.id);
          }}
        >
          <Add />
        </Button>

        {qty}

        <Button
          className="!bg-green-400 !px-2 !text-gray-700"
          onClick={async () => {
            if (qty > 0) await updateQty(book.id, "decrement");
          }}
        >
          <MinusBlock />
        </Button>
      </div>
      {/* <Button
        onClick={async () => await addToCart(book.id)}
        className='mt-2 flex gap-2'
      >
        <Cart />
        Add to Cart
      </Button> */}
    </div>
  );
}

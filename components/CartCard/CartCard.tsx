"use client";

import { updateQty } from "@/app/cart/actions";
import { Add, Bookmark, MinusBlockB } from "@meistericons/react";
import { Author, Book, Genre } from "@prisma/client";
import parse from "html-react-parser";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Buttons/Button";

export default function CartCard({
  book,
  qty,
}: Readonly<{
  book: Book & { genre: Genre } & { author: Author };
  qty: number;
}>) {
  const [loading, setLoading] = useState({
    increment: false,
    decrement: false,
  });

  const handleIncrement = async () => {
    if (book.quantity - qty > 0) {
      setLoading((prev) => ({ ...prev, increment: true }));
      await updateQty(book.id);
      setLoading((prev) => ({ ...prev, increment: false }));
    } else {
      toast("Stock is empty!", { icon: "🪹" });
    }
  };

  const handleDecrement = async () => {
    if (qty > 0) {
      setLoading((prev) => ({ ...prev, decrement: true }));
      await updateQty(book.id, "decrement");
      setLoading((prev) => ({ ...prev, decrement: false }));
    } else {
      toast.custom("Stock is empty!", { icon: "🪹" });
    }
  };

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
          <p className="max-w-96 break-words">
            {parse(book.description.substring(0, 60))}...
          </p>
          <p className="text-base font-medium">
            Author:&nbsp;{" "}
            <strong className="font-bold text-gray-900">
              {book.author?.name}
            </strong>
          </p>
          <p>{book.quantity - qty > 0 ? book.quantity - qty : null}</p>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="!bg-green-400 !px-2 text-gray-700"
          onClick={handleIncrement}
          disabled={loading.increment}
        >
          <Add
            className={`w-5 h-5 ${loading.increment ? "animate-spin" : "text-gray-900"}`}
          />
        </Button>

        <p className="text-gray-700 font-bold text-4xl">{qty}</p>

        <Button
          className="!bg-green-400 !px-2 text-gray-700"
          onClick={handleDecrement}
          disabled={loading.decrement}
        >
          <MinusBlockB
            className={`w-5 h-5 ${loading.decrement ? "animate-spin" : "text-red-900"}`}
          />
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

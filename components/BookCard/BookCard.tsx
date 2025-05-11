"use client";

import { addToCart } from "@/app/cart/actions";
import { Bookmark, Cart } from "@meistericons/react";
import { Author, Book, Genre } from "@prisma/client";
import parse from "html-react-parser";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";

export default function BookCard({
  book,
}: Readonly<{
  book: Book & { genre: Genre } & { author: Author };
}>) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(book.id);
    toast.success(`${book.name} added to cart`);
    setLoading(false);
  };

  return (
    <div className="rounded-lg border border-gray-400 p-2 max-w-96">
      <Image
        alt={book.name}
        src={
          process.env.NODE_ENV === "development"
            ? `/uploads/books/${book.image}`
            : book.image
        }
        width={240}
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
        <p className="w-full max-w-96 break-words text-base font-medium">
          {parse(book.description.substring(0, 80))}...
        </p>
        <p className="text-base font-medium">
          Author:&nbsp;{" "}
          <strong className="font-bold text-gray-900">
            {book.author?.name}
          </strong>
        </p>
      </a>
      <Button
        disabled={loading}
        onClick={handleAddToCart}
        className="mt-2 flex gap-2"
      >
        <Cart className={`${loading ? "animate-spin" : ""}`} />
        {loading ? "Adding" : "Add"} to Cart
      </Button>
    </div>
  );
}

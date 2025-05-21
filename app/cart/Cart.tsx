"use client";

import { CartCard, PageLayout } from "@/components";
import { Author, Book, Genre } from "@prisma/client";
import { Key, useMemo } from "react";
import Checkout from "./PlaceOrder";

type CartProps = {
  cartItems: {
    id: Key | null | undefined;
    book: Book & {
      genre: Genre;
    } & {
      author: Author;
    };
    quantity: number;
  }[];
  isAuth: boolean;
};

export default function Cart({ cartItems, isAuth }: Readonly<CartProps>) {
  const totalPrice = useMemo(() => {
    return cartItems
      .map(
        (cartItem) =>
          parseInt(cartItem.book.price.toString()) * cartItem.quantity
      )
      .reduce((a: number, b: number) => a + b, 0);
  }, [cartItems]);

  return (
    <PageLayout className="mt-12">
      <h3 className="mb-3 text-3xl font-bold">Cart</h3>

      {cartItems.map(
        (cartItem: {
          id: Key | null | undefined;
          book: Book & {
            genre: Genre;
          } & {
            author: Author;
          };
          quantity: number;
        }) => (
          <CartCard
            key={cartItem.id}
            book={cartItem.book}
            qty={cartItem.quantity}
          />
        )
      )}

      <div className="flex w-full justify-between border-t border-gray-400 py-4">
        <strong className="text-lg font-semibold">Total:</strong>
        <span className="flex flex-col gap-4">
          <p className="text-3xl font-bold">${totalPrice}</p>
          <Checkout isAuth={isAuth} />
        </span>
      </div>
    </PageLayout>
  );
}

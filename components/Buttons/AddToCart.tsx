"use client";

import { addToCart } from "@/app/cart/actions";
import { ArchiveCross, Cart } from "@meistericons/react";
import { Book } from "@prisma/client";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Button, { ButtonProps } from "./Button";

type AddToCartProps = {
  book: Book;
  buttonProps?: ButtonProps;
};

export default function AddToCart({
  book,
  buttonProps,
}: Readonly<AddToCartProps>) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(book.id);
    toast.success(`${book.name} added to cart`);
    setLoading(false);
  };

  const buttonText = useMemo(() => {
    if (book.quantity <= 0) {
      return "Out of Stock";
    } else if (loading) {
      return "Adding...";
    }
    return "Add to Cart";
  }, [book.quantity, loading]);

  return (
    <Button
      {...buttonProps}
      disabled={loading || book.quantity <= 0}
      onClick={handleAddToCart}
      className={`${buttonProps?.className} flex ${loading || book.quantity <= 0 ? "" : "!bg-[#519e8a]"} mt-5 gap-0.5 rounded-xl items-center justify-center w-full !p-3`}
    >
      {book.quantity <= 0 ? (
        <ArchiveCross />
      ) : (
        <Cart className={`${loading ? "animate-spin" : ""}`} />
      )}
      {buttonText}
    </Button>
  );
}

"use client";

import { addToCart } from "@/app/actions";
import { Listing } from "@/generated/prisma/client/client";
import { ArchiveCross, Cart } from "@meistericons/react";
import { useActionState, useMemo } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

type AddToCartProps = {
  listing: Pick<Listing, "id" | "quantity">;
};

export default function AddToCart({ listing }: Readonly<AddToCartProps>) {
  const handleAddToCart = async (prevState: unknown, formData: FormData) => {
    const state = await addToCart(listing.id);
    if (state.type === "success") {
      toast.success("Item added to cart");
    } else {
      toast.error(state.message);
    }
    return state;
  };

  const [_state, formAction, isPending] = useActionState(handleAddToCart, null);

  const isOutOfStock = useMemo(() => {
    return listing.quantity <= 0;
  }, [listing.quantity]);

  return (
    <form action={formAction}>
      <Button
        type="submit"
        aria-disabled={isPending || listing.quantity <= 0}
        disabled={isPending || listing.quantity <= 0}
        size="sm"
        isLoading={isPending}
        leftIcon={
          isOutOfStock ? (
            <ArchiveCross />
          ) : (
            <Cart className={`${isPending ? "animate-spin" : ""}`} />
          )
        }
      >
        {isPending
          ? "Adding..."
          : isOutOfStock
            ? "Out of Stock"
            : "Add to Cart"}
      </Button>
    </form>
  );
}

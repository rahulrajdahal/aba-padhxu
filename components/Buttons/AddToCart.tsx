"use client";

import { addToCart } from "@/app/actions";
import { Listing } from "@/generated/prisma/client/client";
import { ArchiveCross, Cart } from "@meistericons/react";
import { useActionState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

type AddToCartProps = {
  listing: Pick<Listing, "id" | "quantity">;
};

export default function AddToCart({ listing }: Readonly<AddToCartProps>) {
  const handleAddToCart = async (prevState: unknown, formData: FormData) => {
    const state = await addToCart(listing.id);
    console.log(state, "state");
    if (state.type === "success") {
      toast.success("Item added to cart");
    } else {
      toast.error(state.message);
    }
    return state;
  };

  const [_state, formAction, isPending] = useActionState(handleAddToCart, null);

  const outOfStock = listing.quantity <= 0;

  return (
    <form action={formAction}>
      <Button
        type="submit"
        aria-disabled={isPending || outOfStock}
        disabled={isPending || outOfStock}
        size="sm"
        isLoading={isPending}
        leftIcon={
          outOfStock ? (
            <ArchiveCross />
          ) : (
            <Cart className={`${isPending ? "animate-spin" : ""}`} />
          )
        }
      >
        {isPending ? "Adding..." : outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </form>
  );
}

"use client";

import {
  addWishlist,
  deleteWishlistByBookId,
} from "@/app/dashboard/wishlists/actions";
import { mergeClassNames } from "@/lib/mergeClassNames";
import { HeartB } from "@meistericons/react";
import { useActionState } from "react";
import toast from "react-hot-toast";

export default function WishlistBadge({
  bookId,
  inWishlist,
}: {
  bookId: string;
  inWishlist: boolean;
}) {
  async function handleAddToWishlist(prevState: unknown, formData: FormData) {
    formData.append("bookId", bookId);
    const state = await addWishlist(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  }

  async function handleRemoveFromWishlist(
    prevState: unknown,
    formData: FormData,
  ) {
    const state = await deleteWishlistByBookId(bookId);

    if (state.type === "success") {
      toast.success("Removed from wishlist");
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  }

  const [_, formAction, isPending] = useActionState(handleAddToWishlist, null);

  const [__, formRemoveAction, isPendingRemove] = useActionState(
    handleRemoveFromWishlist,
    null,
  );

  return (
    <form action={inWishlist ? formRemoveAction : formAction}>
      <button
        type="submit"
        disabled={isPending || isPendingRemove}
        aria-disabled={isPending || isPendingRemove}
        className={mergeClassNames(
          "absolute top-3 right-3 p-2 rounded-full bg-primary-50/80 backdrop-blur-sm shadow-sm text-primary-100 hover:text-red-500 transition disabled:animate-pulse disabled:cursor-not-allowed",
          isPending || isPendingRemove
            ? "animate-spin hover:cursor-progress"
            : "",
          inWishlist ? "text-red-500" : "",
        )}
      >
        <HeartB size={24} />
      </button>
    </form>
  );
}

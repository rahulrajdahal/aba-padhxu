"use client";

import { addWishlist } from "@/app/dashboard/wishlists/actions";
import { mergeClassNames } from "@/lib/mergeClassNames";
import { HeartB } from "@meistericons/react";
import { useActionState } from "react";
import toast from "react-hot-toast";

export default function WishlistBadge({ bookId }: { bookId: string }) {
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

  const [_state, formAction, isPending] = useActionState(
    handleAddToWishlist,
    null,
  );
  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        className={mergeClassNames(
          "absolute top-3 right-3 p-2 rounded-full bg-primary-50/80 backdrop-blur-sm shadow-sm text-primary-100 hover:text-red-500 transition disabled:animate-pulse disabled:cursor-not-allowed",
          isPending ? "animate-spin hover:cursor-progress" : "",
        )}
      >
        <HeartB size={24} />
      </button>
    </form>
  );
}

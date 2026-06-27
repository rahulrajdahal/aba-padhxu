import { Wishlist } from "@/generated/prisma/client/client";

export type CreateWishlistDTO = Pick<Wishlist, "userId" | "bookId">;

export type PatchWishlistDTO = Partial<Wishlist>;

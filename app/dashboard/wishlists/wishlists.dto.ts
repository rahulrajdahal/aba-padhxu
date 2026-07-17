import { Book, Genre, Wishlist } from "@/generated/prisma/client/client";

export type CreateWishlistDTO = Pick<Wishlist, "userId" | "bookId">;

export type PatchWishlistDTO = Partial<Wishlist>;

export type WishlistWithBookAndGenreName = Wishlist &
  Book & { genre: Genre["name"] };

export const mapWishlistWithBookAndGenreName = (
  wishlist: Wishlist & { book: Book & { genre: Pick<Genre, "name"> } },
): WishlistWithBookAndGenreName => {
  return {
    ...wishlist,
    ...wishlist.book,
    genre: wishlist.book.genre.name,
  };
};

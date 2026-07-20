import "server-only";

import { Book, Genre, Listing } from "@/generated/prisma/client/client";

export type CreateListingDTO = Omit<Listing, "createdAt" | "updatedAt" | "id">;

export type PatchListingDTO = Partial<CreateListingDTO>;

export type ListingWithBookAndGenreName = Listing &
  Book & { genre: Genre["name"] };

export const mapListingWithBookAndGenreName = (
  listing: Listing & { book: Book & { genre: Pick<Genre, "name"> } },
): ListingWithBookAndGenreName => {
  return { ...listing, ...listing.book, genre: listing.book.genre.name };
};

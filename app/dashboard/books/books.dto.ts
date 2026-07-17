import { Book, Genre } from "@/generated/prisma/client/client";

export type CreateBookDTO = Omit<Book, "id" | "createdAt" | "updatedAt">;

export type PatchBookDTO = Partial<CreateBookDTO>;

export const mapBookDTO = (book: Book): CreateBookDTO => {
  const { createdAt, updatedAt, ...rest } = book;

  return rest;
};

export type BookWithGenreName = Book & { genre: Genre["name"] };

export const mapBookWithGenreNameDTO = (
  book: Book & { genre: Pick<Genre, "name"> },
) => {
  return {
    ...book,
    genre: book.genre.name,
  };
};

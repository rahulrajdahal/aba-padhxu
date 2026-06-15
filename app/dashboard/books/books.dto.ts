import { Book } from "@/generated/prisma/client/client";

export type CreateBookDTO = Omit<Book, "id" | "createdAt" | "updatedAt">;

export type PatchBookDTO = Partial<CreateBookDTO>;

export const mapBookDTO = (book: Book): CreateBookDTO => {
  const { createdAt, updatedAt, ...rest } = book;

  return rest;
};

import prisma from "@/utils/prisma";
import { Author, Book, Genre } from "@prisma/client";
import Books from "./Books";

export default async function page() {
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: { name: true },
      },
      genre: {
        select: { title: true },
      },
    },
  });

  return (
    <Books
      books={
        books as ({
          genre: Pick<Genre, "title">;
          author: Pick<Author, "name">;
        } & Book)[]
      }
    />
  );
}

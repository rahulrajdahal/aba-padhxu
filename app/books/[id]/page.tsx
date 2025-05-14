import prisma from "@/prisma/prisma";
import { BookWithAuthorAndGenre } from "@/types";
import Book from "./Book";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, avatar: true } },
      genre: { select: { title: true } },
    },
  });

  if (book) return <Book book={book as BookWithAuthorAndGenre} />;

  return <div>Book not found</div>;
}

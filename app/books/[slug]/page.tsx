import prisma from "@/prisma/prisma";
import { BookWithAuthorAndGenre } from "@/types";
import Book from "./Book";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const book = await prisma.book.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true, avatar: true } },
      genre: { select: { title: true } },
    },
  });

  if (!book) return <div>Book not found</div>;

  return <Book book={book as BookWithAuthorAndGenre} />;
}

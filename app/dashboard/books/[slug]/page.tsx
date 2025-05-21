import prisma from "@/prisma/prisma";
import { BookWithAuthorAndGenre } from "@/types";
import EditBook from "./EditBook";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [book, authors, genres] = await Promise.all([
    prisma.book.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true, id: true },
        },
        genre: {
          select: { title: true, id: true },
        },
      },
    }),
    prisma.author.findMany({ select: { name: true, id: true } }),
    prisma.genre.findMany({ select: { title: true, id: true } }),
  ]);

  if (book) {
    return (
      <EditBook
        book={book as unknown as BookWithAuthorAndGenre}
        authors={authors}
        genres={genres}
      />
    );
  }
}

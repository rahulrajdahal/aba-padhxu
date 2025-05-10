import { BookWithAuthorAndGenre } from "@/types";
import prisma from "@/utils/prisma";
import EditBook from "./EditBook";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [book, authors, genres] = await Promise.all([
    prisma.book.findUnique({
      where: { id },
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

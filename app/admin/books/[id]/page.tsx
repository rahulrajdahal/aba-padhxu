import prisma from '@/utils/prisma';
import { Author, Book } from '@prisma/client';
import EditBook from './EditBook';

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const [book, authors] = await Promise.all([
    prisma.book.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, id: true },
        },
      },
    }),
    prisma.author.findMany({ select: { name: true, id: true } }),
  ]);

  if (book) {
    return (
      <EditBook book={book as Book & { author: Author }} authors={authors} />
    );
  }
}

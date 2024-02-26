import prisma from '@/utils/prisma';
import Books from './Books';

export default async function page() {
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return <Books books={books} />;
}

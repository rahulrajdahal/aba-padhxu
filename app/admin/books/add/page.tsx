import prisma from '@/utils/prisma';
import AddBook from './AddBook';

export default async function page() {
  const authors = await prisma.author.findMany({
    select: { name: true, id: true },
  });

  return <AddBook authors={authors} />;
}

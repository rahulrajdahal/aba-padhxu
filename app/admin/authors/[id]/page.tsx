import prisma from '@/utils/prisma';
import EditAuthor from './EditAuthor';

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const author = await prisma.author.findUnique({
    where: { id },
  });

  if (author) {
    return <EditAuthor author={author} />;
  }
}

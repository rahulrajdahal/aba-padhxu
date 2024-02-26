import prisma from '@/utils/prisma';
import Authors from './Authors';

export default async function page() {
  const authors = await prisma.author.findMany({});

  return <Authors authors={authors} />;
}

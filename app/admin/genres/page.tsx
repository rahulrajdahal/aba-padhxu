import prisma from '@/utils/prisma';
import Genres from './Genres';

export default async function page() {
  const genres = await prisma.genre.findMany({});

  return <Genres genres={genres} />;
}

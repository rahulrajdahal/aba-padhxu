import prisma from '@/utils/prisma';
import EditGenre from './EditGenre';

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const genre = await prisma.genre.findUnique({
    where: { id },
  });

  if (genre) {
    return <EditGenre genre={genre} />;
  }
}

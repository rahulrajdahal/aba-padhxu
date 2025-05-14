import prisma from "@/prisma/prisma";
import EditGenre from "./EditGenre";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const genre = await prisma.genre.findUnique({
    where: { id },
  });

  if (genre) {
    return <EditGenre genre={genre} />;
  }

  return <div>Genre not found</div>;
}

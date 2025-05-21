import prisma from "@/prisma/prisma";
import EditGenre from "./EditGenre";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const genre = await prisma.genre.findUnique({
    where: { slug },
  });

  if (genre) {
    return <EditGenre genre={genre} />;
  }

  return <div>Genre not found</div>;
}

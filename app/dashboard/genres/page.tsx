import prisma from "@/prisma/prisma";
import Genres from "./Genres";

export default async function page() {
  const genres = await prisma.genre.findMany({});

  return <Genres genres={genres} />;
}

import prisma from "@/utils/prisma";
import AddBook from "./AddBook";

export default async function page() {
  const [authors, genres] = await Promise.all([
    prisma.author.findMany({
      select: { name: true, id: true },
    }),
    prisma.genre.findMany({
      select: { title: true, id: true },
    }),
  ]);

  return <AddBook authors={authors} genres={genres} />;
}

import prisma from "@/prisma/prisma";
import { BookWithAuthorAndGenre } from "@/types";
import { cookies } from "next/headers";
import Books from "./Books";

export default async function page() {
  const books = await prisma.book.findMany({
    where: {
      sellerId: (await cookies()).get("userId")?.value,
    },
    include: {
      author: {
        select: { name: true },
      },
      genre: {
        select: { title: true },
      },
    },
  });

  return <Books books={books as unknown as BookWithAuthorAndGenre[]} />;
}

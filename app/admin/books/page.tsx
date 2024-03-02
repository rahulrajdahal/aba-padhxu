import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import Books from "./Books";

export default async function page() {
  const books = await prisma.book.findMany({
    where: {
      sellerId: cookies().get("userId")?.value,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return <Books books={books} />;
}

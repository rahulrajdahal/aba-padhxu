import { UserPageLayout } from "@/components";
import prisma from "@/prisma/prisma";
import { BookWithAuthorAndGenre } from "@/types";
import Books from "./Books";
import { getNavbarProps } from "./auth/actions";

export default async function page() {
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: { name: true },
      },
      genre: {
        select: { title: true },
      },
    },
  });

  const navbarProps = await getNavbarProps();

  return (
    <UserPageLayout navbarProps={navbarProps}>
      <Books
        books={
          books.map((book) => ({
            ...book,
            price: Number(book.price).toFixed(2),
          })) as unknown as BookWithAuthorAndGenre[]
        }
      />
      ;
    </UserPageLayout>
  );
}

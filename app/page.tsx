import { UserPageLayout } from "@/components";
import { BookWithAuthorAndGenre } from "@/types";
import prisma from "@/utils/prisma";
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
      <Books books={books as unknown as BookWithAuthorAndGenre[]} />;
    </UserPageLayout>
  );
}

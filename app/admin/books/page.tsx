import { getUserInfo } from "@/app/auth/actions";
import { AdminPageLayout } from "@/components";
import { BookWithAuthorAndGenre } from "@/types";
import prisma from "@/utils/prisma";
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

  const userInfo = await getUserInfo();

  const notifications = await prisma.notification.findMany({
    where: { isRead: false, userId: (await cookies()).get("userId")?.value },
  });

  return (
    <AdminPageLayout
      title="Books"
      user={userInfo}
      notifications={notifications}
    >
      <Books books={books as unknown as BookWithAuthorAndGenre[]} />
    </AdminPageLayout>
  );
}

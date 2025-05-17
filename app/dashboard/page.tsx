import prisma from "@/prisma/prisma";
import { OrderStatus } from "@prisma/client";
import { getUserId } from "../auth/dto";
import Dashboard from "./Dashboard";

export default async function page() {
  const sellerId = await getUserId();

  const [
    ordersPendingCount,
    ordersDeliveredCount,
    ordersCompletedCount,
    booksCount,
    authorsCount,
    genresCount,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        items: {
          every: {
            book: { sellerId },
          },
        },
        status: OrderStatus.PENDING,
      },
    }),
    prisma.order.count({
      where: {
        items: {
          every: {
            book: { sellerId },
          },
        },
        status: OrderStatus.DELIVERING,
      },
    }),
    prisma.order.count({
      where: {
        items: {
          every: {
            book: { sellerId },
          },
        },
        status: OrderStatus.COMPLETED,
      },
    }),
    prisma.book.count({
      where: {
        sellerId,
      },
    }),
    prisma.author.count({
      where: {
        book: {
          every: { sellerId },
        },
      },
    }),
    prisma.genre.count({
      where: {
        book: {
          every: { sellerId },
        },
      },
    }),
  ]);

  return (
    <Dashboard
      ordersPendingCount={ordersPendingCount}
      ordersDeliveredCount={ordersDeliveredCount}
      ordersCompletedCount={ordersCompletedCount}
      booksCount={booksCount}
      authorsCount={authorsCount}
      genresCount={genresCount}
    />
  );
}

import { OrderWithUserAndItems } from "@/types";
import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import Orders from "./Orders";

export default async function page() {
  const userId = (await cookies()).get("userId")?.value as string;

  const orders = await prisma.order.findMany({
    where: {
      items: {
        every: {
          book: { sellerId: userId },
        },
      },
    },
    include: {
      user: { select: { name: true, email: true } },
      items: {
        select: {
          book: { select: { name: true, image: true } },
          quantity: true,
        },
      },
    },
  });

  return <Orders orders={orders as OrderWithUserAndItems[]} />;
}

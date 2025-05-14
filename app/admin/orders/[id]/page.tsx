import { OrderWithUserAndItems } from "@/types";
import prisma from "@/utils/prisma";
import ViewOrder from "./ViewOrder";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
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

  if (order) {
    return <ViewOrder order={order as OrderWithUserAndItems} />;
  }

  return <div>Order not found</div>;
}

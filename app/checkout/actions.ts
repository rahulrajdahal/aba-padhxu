"use server";

import { OrderItemStatus, OrderStatus } from "@/generated/prisma/client/client";
import { prisma } from "@/prisma/prisma";
import { authUserId } from "../(auth)/middleware";
import { completeOrder } from "./order-completion";

export async function placeOrderAction(
  shippingAddressId: string,
  paymentIntentId: string,
) {
  const userId = await authUserId();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 1. Get buyer's cart items
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          listing: {
            include: {
              book: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.cartItems.length === 0) {
    throw new Error("Cart is empty.");
  }

  // 2. Validate stock and calculate total amount
  let subtotalCents = 0;
  for (const item of cart.cartItems) {
    if (item.listing.quantity < item.quantity) {
      throw new Error(`Insufficient stock for "${item.listing.book.title}".`);
    }
    subtotalCents += item.listing.priceCents * item.quantity;
  }

  const taxCents = 336; // $3.36 fixed sales tax
  const totalAmountCents = subtotalCents + taxCents;

  // 3. Create the pending order and order items in a transaction
  const order = await prisma.order.create({
    data: {
      totalAmountCents,
      paymentStatus: OrderStatus.PENDING,
      paymentGatewayRef: paymentIntentId,
      buyerId: userId,
      shippingAddressId,
      orderItems: {
        create: cart.cartItems.map((item) => ({
          historicalTitle: item.listing.book.title,
          historicalIsbn13: item.listing.book.isbn13,
          priceAtPurchaseCents: item.listing.priceCents,
          quantity: item.quantity,
          fulfillmentStatus: OrderItemStatus.PROCESSING,
          listingId: item.listingId,
          sellerId: item.listing.sellerId,
        })),
      },
    },
  });

  return { success: true, orderId: order.id };
}

export async function confirmOrderPaymentAction(paymentIntentId: string) {
  return await completeOrder(paymentIntentId);
}

export async function fetchOrderDetailsByPaymentIntent(
  paymentIntentId: string,
) {
  const userId = await authUserId();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const order = await prisma.order.findFirst({
    where: {
      paymentGatewayRef: paymentIntentId,
      buyerId: userId,
    },
    include: {
      orderItems: true,
      shippingAddress: true,
    },
  });

  return order;
}

export const calculateTax = (total: number) => total * 0.08;

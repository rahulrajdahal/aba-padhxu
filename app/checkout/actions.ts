"use server";

import { OrderItemStatus, OrderStatus } from "@/generated/prisma/client/client";
import {
  badRequestError,
  createdResponse,
  okResponse,
  unauthorizedError,
} from "@/lib/responses";
import { prisma } from "@/prisma/prisma";
import { authUserId } from "../(auth)/middleware";
import { completeOrder } from "./order-completion";

export async function placeOrderAction(
  shippingAddressId: string,
  paymentIntentId: string,
) {
  const userId = (await authUserId()) as string;
  if (!userId) {
    return unauthorizedError();
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
    return badRequestError("Cart is empty.");
  }

  // 2. Validate stock and calculate total amount
  let subtotalPennies = 0;
  for (const item of cart.cartItems) {
    if (item.listing.quantity < item.quantity) {
      return badRequestError(
        `Insufficient stock for "${item.listing.book.title}".`,
      );
    }
    subtotalPennies += item.listing.pricePennies * item.quantity;
  }

  const taxCents = 336; // $3.36 fixed sales tax
  const totalAmountPennies = subtotalPennies + taxCents;

  // 3. Create the pending order and order items in a transaction
  const order = await prisma.order.create({
    data: {
      totalAmountPennies,
      paymentStatus: OrderStatus.PENDING,
      buyerId: userId,
      shippingAddressId,
      stripePaymentIntentId: paymentIntentId,
      orderItems: {
        create: cart.cartItems.map((item) => ({
          historicalTitle: item.listing.book.title,
          historicalIsbn13: item.listing.book.isbn13,
          priceAtPurchasePennies: item.listing.pricePennies,
          quantity: item.quantity,
          fulfillmentStatus: OrderItemStatus.PROCESSING,
          listingId: item.listingId,
          sellerId: item.listing.sellerId,
        })),
      },
    },
  });

  return createdResponse("Order placed successfully", order.id);
}

export async function confirmOrderPaymentAction(paymentIntentId: string) {
  return await completeOrder(paymentIntentId);
}

export async function fetchOrderDetailsByPaymentIntent(
  paymentIntentId: string,
) {
  const userId = await authUserId();
  if (!userId) {
    return unauthorizedError();
  }

  const order = await prisma.order.findFirst({
    where: {
      stripePaymentIntentId: paymentIntentId,
      buyerId: userId,
    },
    include: {
      orderItems: true,
      shippingAddress: true,
    },
  });

  return okResponse("Order fetched successfully", order);
}

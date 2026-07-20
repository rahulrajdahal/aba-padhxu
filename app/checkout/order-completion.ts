import { sendOrderEmail } from "@/app/dashboard/orders/orders.middleware";
import {
  LedgerTransactionType,
  NotificationType,
  OrderItemStatus,
  OrderStatus,
} from "@/generated/prisma/client/client";
import { badRequestError, createdResponse } from "@/lib/responses";
import { prisma } from "@/prisma/prisma";

export async function completeOrder(paymentIntentId: string) {
  // Find the pending order in the database
  const order = await prisma.order.findFirst({
    where: {
      stripePaymentIntentId: paymentIntentId,
      paymentStatus: OrderStatus.PENDING,
    },
    include: {
      orderItems: true,
      buyer: true,
    },
  });

  if (!order) {
    return badRequestError("Order not found or already processed.");
  }

  await prisma.$transaction(async (tx) => {
    // 1. Update order status to PAID
    await tx.order.update({
      where: { id: order.id },
      data: { paymentStatus: OrderStatus.PAID },
    });

    // 2. Process each order item
    for (const item of order.orderItems) {
      if (item.listingId) {
        const listing = await tx.listing.findUnique({
          where: { id: item.listingId },
        });

        if (listing) {
          const newQuantity = Math.max(0, listing.quantity - item.quantity);
          await tx.listing.update({
            where: { id: item.listingId },
            data: {
              quantity: newQuantity,
              isActive: newQuantity > 0,
            },
          });
        }
      }

      // Create EscrowPayout for the seller
      await tx.escrowPayout.create({
        data: {
          amountPennies: item.priceAtPurchasePennies * item.quantity,
          releaseEligibleAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days escrow hold
          orderItemId: item.id,
          sellerId: item.sellerId,
          escrowStatus: OrderItemStatus.ESCROW_HELD,
        },
      });

      // Update seller's pending escrow funds balance
      await tx.userProfile.update({
        where: { userId: item.sellerId },
        data: {
          pendingEscrowFunds: {
            increment: item.priceAtPurchasePennies * item.quantity,
          },
        },
      });

      // Record escrow lock ledger transaction
      await tx.ledgerTransaction.create({
        data: {
          userId: item.sellerId,
          amountPennies: item.priceAtPurchasePennies * item.quantity,
          type: LedgerTransactionType.ESCROW_LOCK,
          description: `Funds locked in escrow for sale of "${item.historicalTitle}" (Order Item ID: ${item.id})`,
          referenceId: item.id,
        },
      });

      // Create notification for seller
      await tx.notification.create({
        data: {
          type: NotificationType.ORDER_STATUS,
          title: "New Order Received",
          body: `You received a new order for "${item.historicalTitle}".`,
          userId: item.sellerId,
          targetUrl: `/dashboard/orders`,
        },
      });
    }

    // 3. Clear buyer's cart
    const cart = await tx.cart.findUnique({
      where: { userId: order.buyerId },
    });
    if (cart) {
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    // 4. Create notification for buyer
    await tx.notification.create({
      data: {
        type: NotificationType.ORDER_STATUS,
        title: "Order Placed Successfully",
        body: `Your payment was processed and your order has been placed successfully.`,
        userId: order.buyerId,
        targetUrl: `/dashboard/orders`,
      },
    });

    // 5. Send order confirmation email
    if (order.buyer?.email) {
      try {
        await sendOrderEmail(
          { id: order.buyerId, email: order.buyer.email },
          `Order confirmation email sent for order ${order.id}`,
        );
      } catch (emailError) {
        console.error("Error sending order email:", emailError);
      }
    }
  });

  return createdResponse("Order completed successfully");
}

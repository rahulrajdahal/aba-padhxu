import { OrderItemStatus } from "@/generated/prisma/client/client";
import z from "zod";

export const addOrderItemSchema = z.object({
  historicalTitle: z.string(),
  historicalIsbn13: z.string(),
  priceAtPurchasePennies: z.number().positive("Minimum 0"),
  quantity: z.number().positive("Minimum 0"),
  fulfillmentStatus: z
    .enum(Object.values(OrderItemStatus))
    .default(OrderItemStatus.PROCESSING),
});

export const updateOrderItemSchema = z.object({
  historicalTitle: z.string().optional(),
  historicalIsbn13: z.string().optional(),
  priceAtPurchasePennies: z.number().positive("Minimum 0").optional(),
  quantity: z.number().positive("Minimum 0").optional(),
  fulfillmentStatus: z
    .enum(Object.values(OrderItemStatus))
    .default(OrderItemStatus.PROCESSING)
    .optional(),
});

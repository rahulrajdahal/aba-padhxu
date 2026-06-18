import { OrderStatus } from "@/generated/prisma/client/client";
import z from "zod";

export const addOrderSchema = z.object({
  totalAmountCents: z.number().positive("Minimum 0"),
  shippingAddressId: z.string(),
  paymentStatus: z
    .enum(Object.values(OrderStatus))
    .default(OrderStatus.PENDING),
  orderItems: z.array(z.object()),
});

export const updateOrderSchema = z.object({
  totalAmountCents: z.number().positive("Minimum 0").optional(),
  shippingAddressId: z.string().optional(),
  paymentStatus: z.enum(Object.values(OrderStatus)).optional(),
  orderItems: z.array(z.object()).optional(),
});

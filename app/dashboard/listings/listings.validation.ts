import "server-only";

import { BookCondition } from "@/generated/prisma/client/enums";
import z from "zod";

export const addListingSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
  condition: z.enum(Object.values(BookCondition)),
  priceCents: z.number().min(1, "Price is required"),
  quantity: z.number().min(1, "Quantity is required"),
  description: z.string(),
  isActive: z.boolean().optional(),
});

export const updateListingSchema = z.object({
  condition: z.enum(Object.values(BookCondition)).optional(),
  priceCents: z.number().min(1).optional(),
  quantity: z.number().min(1).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

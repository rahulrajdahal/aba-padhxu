import { OrderItem } from "@/generated/prisma/client/client";

export interface CreateOrderItemDTO extends Omit<
  OrderItem,
  "id" | "createdAt" | "updatedAt"
> {}

export interface PutOrderItemDTO extends CreateOrderItemDTO {}

export interface PatchOrderItemDTO extends Partial<CreateOrderItemDTO> {}

import { Order } from "@/generated/prisma/client/client";

export interface CreateOrderDTO extends Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "paymentGatewayRef"
> {}

export interface PutOrderDTO extends CreateOrderDTO {}
export interface PatchOrderDTO extends Partial<CreateOrderDTO> {}

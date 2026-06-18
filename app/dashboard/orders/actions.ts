"use server";

import { authUser, authUserId, isAuthenticated } from "@/app/(auth)/middleware";
import { OrderStatus } from "@/generated/prisma/client/enums";
import { logger } from "@/lib/logger";
import {
  createdResponse,
  noContentResponse,
  okResponse,
  serverError,
  unauthorizedError,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { PatchOrderDTO } from "./orders.dto";
import { sendOrderEmail } from "./orders.middleware";
import { OrderService } from "./orders.service";
import { addOrderSchema, updateOrderSchema } from "./orders.validation";

export const addOrder = async (prevData: unknown, formData: FormData) => {
  try {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      return unauthorizedError();
    }

    const userId = await authUserId();
    if (!userId) {
      return unauthorizedError();
    }

    const body = {
      totalAmountCents: Number(formData.get("totalAmountCents") as string),
      paymentStatus: formData.get("paymentStatus") as OrderStatus,
      shippingAddressId: formData.get("shipppingAddressId") as string,
      orderItems: formData.getAll("orderItems") as string[],
    };
    const validateBody = addOrderSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await OrderService.createOrder({ ...body, buyerId: userId as string });
    revalidatePath(`${routes.dashboard}${routes.orders}`);
    return createdResponse("Order created successfully", 201);
  } catch (error) {
    logger.error("error", error);
    return serverError();
  }
};

export const fetchAllOrders = async (
  query: string,
  limit: number,
  page: number,
) => {
  try {
    const orders = await OrderService.findAllOrders(query, limit, page);
    return okResponse("Orders fetched successfully", orders);
  } catch (error) {
    logger.error("error", error);
    return serverError();
  }
};

export const fetchOrderById = async (id: string) => {
  try {
    const order = await OrderService.findOrderById(id);
    return okResponse("Order fetched successfully", order);
  } catch (error) {
    logger.error("error", error);
    return serverError();
  }
};

export const updateOrder = async (id: string, formData: FormData) => {
  try {
    const body: PatchOrderDTO = {};

    const user = await authUser();
    if (!user) {
      return unauthorizedError();
    }

    const totalAmountCents = formData.get("totalAmountCents") as string;
    const paymentStatus = formData.get("paymentStatus") as OrderStatus;
    const shippingAddressId = formData.get("shipppingAddressId") as string;
    const orderItems = formData.getAll("orderItems") as string[];

    if (totalAmountCents) {
      body.totalAmountCents = Number(totalAmountCents);
    }

    if (paymentStatus) {
      body.paymentStatus = paymentStatus;
    }

    if (shippingAddressId) {
      body.shippingAddressId = shippingAddressId;
    }

    const validateBody = updateOrderSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await OrderService.patchOrderById(id, body);

    await sendOrderEmail(user);

    // const notificationFormData = new FormData();
    // notificationFormData.append("title", "Order Status Updated");

    // const getDescription = () => {
    //   if (status === OrderStatus.COMPLETED) {
    //     return `Your order has been completed`;
    //   } else if (status === OrderStatus.DELIVERING) {
    //     return `Your order is being delivered`;
    //   } else {
    //     return `Your order is pending`;
    //   }
    // };
    // notificationFormData.append("description", getDescription());
    // notificationFormData.append("userId", userId);

    // await addNotification(null, notificationFormData);
    // await sendNotification("Order Status Updated", getDescription());

    revalidatePath(`${routes.dashboard}${routes.orders}`);
    return noContentResponse();
  } catch (error) {
    logger.error("error", error);
    return serverError();
  }
};

export const deleteOrderById = async (id: string) => {
  try {
    await OrderService.deleteOrderById(id);
    revalidatePath(`${routes.dashboard}${routes.orders}`);
    return noContentResponse("Order deleted successfully");
  } catch (error) {
    logger.error("error", error);
    return serverError();
  }
};

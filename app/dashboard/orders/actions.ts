"use server";

import { sendNotification } from "@/_components/actions";
import { sendOrderEmail } from "@/app/order/actions";
import prisma from "@/prisma/prisma";
import { getErrorResponse, getSuccessResponse } from "@/utils/helpers";
import { routes } from "@/utils/routes";
import { Order, OrderStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addNotification } from "../notifications/actions";

const genreSchema = z.object({
    title: z.string().min(3, "Min 3 Characters."),
});

const updateOrderSchema = z.object({
    status: z.enum([OrderStatus.PENDING, OrderStatus.DELIVERING, OrderStatus.COMPLETED]),
});

export const addGenre = async (prevData: unknown, formData: FormData) => {
    try {
        const body = {
            title: formData.get("title") as string,
        };
        const validateBody = genreSchema.safeParse(body);
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(
                    ([key, errorValue]) => ({ [key]: errorValue[0] })
                )[0],
            };
        }
        await prisma.genre.create({ data: { ...body, slug: body.title.toLowerCase().replace(/ /g, "-") } });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error(error.message);
            }
        }
        throw new Error("Server Error");
    }
    redirect(`${routes.dashboard}${routes.genres}`);
};

export const deleteGenre = async (id: string) => {
    try {
        const genre = await prisma.genre.delete({
            where: { id },
        });

        if (!genre) {
            throw new Error("Could not remove genre.");
        }

        revalidatePath("/admin/genres");
        revalidatePath("/genres");
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error(error.message);
            }
        }

        throw new Error("Server Error");
    }
    redirect(`${routes.dashboard}${routes.genres}`);
};

export const updateOrder = async (prevState: unknown, formData: FormData) => {
    try {
        const id = formData.get("id") as string;

        const body: Partial<Order> = {};

        const status = formData.get("status") as OrderStatus;
        const userId = formData.get("userId") as string;


        if (status) {
            body.status = status;
        }

        const validateBody = updateOrderSchema.safeParse(body);
        if (!validateBody.success) {
            return getErrorResponse(
                "Validation Error",
                400,
                undefined,
                Object.entries(validateBody.error.flatten().fieldErrors).map(
                    ([key, errorValue]) => ({ [key]: errorValue[0] })
                )[0]
            );
        }

        await prisma.order.update({
            where: { id },
            data: body,
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return getErrorResponse("Error sending user order email");
        }

        await sendOrderEmail(user);

        const notificationFormData = new FormData();
        notificationFormData.append("title", "Order Status Updated");

        const getDescription = () => {
            if (status === OrderStatus.COMPLETED) {
                return `Your order has been completed`;
            } else if (status === OrderStatus.DELIVERING) {
                return `Your order is being delivered`;
            } else {
                return `Your order is pending`;
            }
        };
        notificationFormData.append("description", getDescription());
        notificationFormData.append("userId", userId);

        await addNotification(null, notificationFormData);
        await sendNotification("Order Status Updated", getDescription());


        revalidatePath("/");
        revalidatePath("/admin/orders");

        return getSuccessResponse("Order Updated Successfully", 204);
    } catch (error) {
        console.log(error, 'error');
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse("Server Error");
    }
};

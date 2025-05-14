'use server'

import { getErrorResponse, getSuccessResponse } from "@/utils/helpers";
import prisma from "@/utils/prisma";
import { routes } from "@/utils/routes";
import { Notification } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addNotificationSchema = z.object({
    title: z.string(),
    description: z.string(),
    isRead: z.boolean().optional()
});
const updateNotificationSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    isRead: z.boolean().optional()
});

export const addNotification = async (prevState: unknown, formData: FormData) => {
    try {
        const body = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            userId: formData.get("userId") as string
        };

        const validatedFields = addNotificationSchema.safeParse(body);

        // Return early if the form data is invalid
        if (!validatedFields.success) {
            return getErrorResponse(
                "Validation Error",
                undefined,
                validatedFields.error.flatten().fieldErrors
            );
        }

        const notification = await prisma.notification.create({
            data: body
        });

        if (!notification) {
            return getErrorResponse("Error creating notification.");
        }

        revalidatePath(routes.dashboard);
        return getSuccessResponse("Notification created!, 201");
    } catch (error) {
        return getErrorResponse("Server Error", 500, error);
    }
};

export const updateNotification = async (id: string, formData: FormData) => {
    try {
        const body: Partial<Notification> = {}

        const isRead = formData.get("isRead") as string;

        if (isRead) {
            body.isRead = true;
        }

        const validatedFields = updateNotificationSchema.safeParse(body);
        // Return early if the form data is invalid
        if (!validatedFields.success) {
            return getErrorResponse(
                "Validation Error",
                undefined,
                validatedFields.error.flatten().fieldErrors
            );
        }


        const notification = await prisma.notification.findUnique({
            where: { id }
        });

        if (!notification) {
            return getErrorResponse("Notification not found.");
        }

        await prisma.notification.update({
            where: { id },
            data: body
        });

        revalidatePath(routes.dashboard);
        return getSuccessResponse("Notification updated!, 204");
    } catch (error) {
        return getErrorResponse("Server Error", 500, error);
    }
};
'use server'

import { getErrorResponse, getSuccessResponse } from "@/utils/helpers";
import prisma from "@/utils/prisma";
import { PaymentMethod } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { z } from "zod";

const orderSchema = z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    amount: z.number().min(1),
    paymentMethod: z.string(),

})

export const placeOrder = async (prevState: unknown, formData: FormData) => {

    try {
        const body = {
            country: formData.get('country') as string,
            city: formData.get('city') as string,
            street: formData.get('street') as string,
            amount: formData.get('amount') ? Number(formData.get('amount') as string) : 1000,
            paymentMethod: formData.get('paymentMethod') ? formData.get('paymentMethod') as PaymentMethod : "CASH",
        }

        const validateBody = orderSchema.safeParse(body)
        if (!validateBody.success) {
            return getErrorResponse(
                "Validation Error", 400, undefined,
                Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0]
            )
        }

        const cartItems = (await cookies()).get("cartItems")?.value ? JSON.parse((await cookies()).get('cartItems')?.value as string) : []

        await prisma.order.create({
            data: {
                ...body,
                userId: (await cookies()).get('userId')?.value as string,
                items: {
                    create: cartItems.map(({ book: { id } }: { book: { id: string } }) => ({
                        book: {
                            connect: { id }
                        }
                    }))
                }
            }
        });

        (await cookies()).delete('cartItems')

        return getSuccessResponse("Order placed successfully", 201)
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse('Server Error')
    }
}


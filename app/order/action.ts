'use server'

import prisma from "@/utils/prisma";
import { routes } from "@/utils/routes";
import { PaymentMethod } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const orderSchema = z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    amount: z.number().min(1),
    paymentMethod: z.string(),

})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const placeOrder = async (formData: FormData) => {

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
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }
        }

        const cartItems = cookies().get("cartItems")?.value ? JSON.parse(cookies().get('cartItems')?.value as string) : []

        await prisma.order.create({
            data: {
                ...body,
                userId: cookies().get('userId')?.value as string,
                items: {
                    create: cartItems.map(({ book: { id } }: { book: { id: string } }) => ({
                        book: {
                            connect: { id }
                        }
                    }))
                }
            }
        });

        cookies().delete('cartItems')


    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(error.message);
            }
        }
        throw new Error('Server Error')
    }
    redirect(routes.home)
}


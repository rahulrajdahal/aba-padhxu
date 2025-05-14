'use server'

import EmailTemplate from "@/emails/EmailTemplate";
import { getErrorResponse, getSuccessResponse } from "@/utils/helpers";
import { transporter } from "@/utils/nodemailer";
import prisma from "@/utils/prisma";
import { PaymentMethod, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { render } from "@react-email/components";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { addNotification } from "../admin/notifications/actions";

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

        const userId = (await cookies()).get('userId')?.value as string

        await prisma.order.create({
            data: {
                ...body,
                userId,
                items: {
                    create: cartItems.map(({ book: { id }, quantity }: { book: { id: string }, quantity: number }) => ({
                        book: {
                            connect: { id },
                        },
                        quantity
                    }))
                }
            }
        });


        (await cookies()).delete('cartItems')


        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            return getErrorResponse("Error placing order.")
        }

        cartItems.forEach(async (cartItem: { book: { id: string; quantity: number; name: string; sellerId: string }, quantity: number }) => {
            await prisma.book.update({ where: { id: cartItem.book.id }, data: { quantity: { decrement: cartItem.quantity } } })

            const formData = new FormData()
            formData.append('title', "Order Placed")
            formData.append('description', `Your item ${cartItem.book.name} has been placed for order by ${user.name}`)
            formData.append('userId', cartItem.book.sellerId)

            await addNotification(null, formData)
        });

        await sendOrderEmail(user)
        return getSuccessResponse("Your order has been placed!", 201)
    } catch (error) {
        console.log(error, 'error')
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse('Server Error')
    }
}



export const deleteOrder = async (id: string) => {
    try {
        const order = await prisma.order.delete({
            where: { id }
        })

        if (!order) {
            return getErrorResponse("Order not found", 400)
        }

        revalidatePath("/admin/orders")
        revalidatePath("/orders")

        return getSuccessResponse("Order deleted successfully", 204)
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse('Server Error')

    }
}


const sendOrderEmail = async (
    user: Pick<User, "email">
) => {
    try {


        const emailHtml = await render(
            EmailTemplate({
                title: "Your order has been placed with Aba Padhxu",
                heading: "Order Placed Confirmation",
                body: `Your order has been placed with Aba Padhxu. Thank you for your purchase!`,
            })
        );

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: user.email,
            subject: "Your order has been placed with Aba Padhxu",
            html: emailHtml,
        };

        await new Promise((resolve, reject) =>
            transporter.sendMail(mailOptions, function (error: unknown) {
                if (error) {
                    reject(new Error("Error sending mail."));
                } else {
                    resolve(true);
                }
            })
        );

    } catch (error) {
        if (error instanceof Error) {
            return getErrorResponse(error.message);
        }
        return getErrorResponse("Error sending mail", 500, error);
    }
};
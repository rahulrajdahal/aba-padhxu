'use server'

import { devUpload, isValidFileType, prodUpload } from '@/utils/helpers';
import prisma from "@/utils/prisma";
import { routes } from '@/utils/routes';
import { Book } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { z } from 'zod';


const bookSchema = z.object({
    name: z.string().min(5, 'Min 5 Characters.'),
    author: z.string(),
    description: z.string().min(20, 'Min 20 characters.'),
    image: z.any().refine((file) => file?.size <= 5000000, `Max image size is 5MB.`).refine((file) => isValidFileType(file?.name), 'Not a valid image.'),
    publishedDate: z.string(),
})

const updateBookSchema = z.object({
    name: z.string().min(5, 'Min 5 Characters.').optional(),
    author: z.string().optional(),
    description: z.string().min(20, 'Min 20 characters.').optional(),
    // image: z.any().refine((file) => file?.size <= 5000000, `Max image size is 5MB.`).refine((file) => isValidFileType(file?.name), 'Not a valid image.').optional(),
    publishedDate: z.string().optional(),
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBook = async (prevData: any, formData: FormData) => {
    try {
        const body: any = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            publishedDate: formData.get('publishedDate') as string,
            price: formData.get('price') as string,
            quantity: Number(formData.get('quantity') as string)
        };
        const sellerId = (cookies().get('userId'))?.value as string
        const image = formData.get('image') as unknown as File;
        const author = formData.get('author') as string


        const validateBody = bookSchema.safeParse({
            ...body,
            image,
            author,
        })
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }
        }

        if (!image || image.name === 'undefined') {
            throw new Error('Image not found');
        }
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let bookImage: string;

        if (process.env.NODE_ENV === 'development') {
            const uploadDIR = `${process.cwd()}/public/uploads/books`;

            bookImage = await devUpload(uploadDIR, image.name, buffer);
        } else {
            const upload = await prodUpload(buffer, image.type, 'books', {
                transformation: { width: 60, height: 60, crop: 'thumb' },
            });

            if (!upload) {
                throw new Error('Error uploading image');
            }
            bookImage = (upload as { secure_url: string })?.secure_url;
        }

        await prisma.book.create({
            data: {
                image: bookImage,
                seller: {
                    connect: {
                        id: sellerId
                    }
                },
                author: {
                    connectOrCreate: {
                        where: { name: author },
                        create: { name: author },
                    }
                },
                ...body,
            }
        })


    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(error.message);
            }
        }
        throw new Error('Server Error')
    }
    redirect(`${routes.dashboard}${routes.books}`)

}

export const deleteBook = async (id: string) => {
    try {
        const book = await prisma.book.delete({
            where: {
                id,
            },
        });

        if (!book) {
            throw new Error('Could not remove project.');
        }

        revalidatePath('/admin/books');
        revalidatePath('/books');
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(
                    error.message
                );
            }
        }


        throw new Error('Server Error');
    }
    redirect(`${routes.dashboard}${routes.books}`)
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateBook = async (id: string, formData: FormData) => {
    try {
        const body: Partial<Book & { author?: never }> = {};

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const publishedDate = formData.get('publishedDate') as string;
        const image = formData.get('image') as unknown as File;
        const author = formData.get('author') as string
        const sellerId = cookies().get('userId')?.value as string


        const validateBody = updateBookSchema.safeParse({
            ...body,
            image,
            author,
        })
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }
        }

        if (name) { body.name = name }
        if (sellerId) { body.sellerId = sellerId }
        if (description) { body.description = description }
        if (publishedDate) { body.publishedDate = publishedDate }
        if (author) {
            body.author = {
                connectOrCreate: {
                    where: { name: author },
                    create: { name: author }
                }
            } as never
        }

        if (image?.name !== 'undefined') {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);


            if (process.env.NODE_ENV === 'development') {
                const uploadDIR = `${process.cwd()}/public/uploads/books`;

                body.image = await devUpload(uploadDIR, image.name, buffer);
            } else {
                const upload = await prodUpload(buffer, image.type, 'books', {
                    transformation: { width: 60, height: 60, crop: 'thumb' },
                });

                if (!upload) {
                    throw new Error('Error uploading image');
                }
                body.image = (upload as { secure_url: string })?.secure_url;
            }
        }

        await prisma.book.update({
            where: { id },
            data:
                body

        })

        revalidatePath('/admin/books')
        revalidatePath('/books')
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(error.message);
            }
        }
        throw new Error('Server Error')
    }
    redirect(`${routes.dashboard}${routes.books}`)

}
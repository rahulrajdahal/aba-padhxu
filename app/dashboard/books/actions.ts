"use server";

import prisma from "@/prisma/prisma";
import {
    devUpload,
    getErrorResponse,
    getSuccessResponse,
    isValidFileType,
    prodUpload,
} from "@/utils/helpers";
import { Book } from "@prisma/client";
import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const bookSchema = z.object({
    name: z.string().min(5, "Min 5 Characters."),
    author: z.string(),
    genre: z.string(),
    description: z.string().min(20, "Min 20 characters."),
    image: z
        .any()
        .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
        .refine((file) => isValidFileType(file?.name), "Not a valid image."),
    publishedDate: z.string(),
});

const updateBookSchema = z.object({
    name: z.string().min(5, "Min 5 Characters.").optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    description: z.string().min(20, "Min 20 characters.").optional(),
    // image: z.any().refine((file) => file?.size <= 5000000, `Max image size is 5MB.`).refine((file) => isValidFileType(file?.name), 'Not a valid image.').optional(),
    publishedDate: z.string().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBook = async (prevData: any, formData: FormData) => {
    try {
        const body: any = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            publishedDate: formData.get("publishedDate") as string,
            price: formData.get("price") as string,
            quantity: Number(formData.get("quantity") as string),
        };
        const sellerId = (await cookies()).get("userId")?.value as string;
        const image = formData.get("image") as unknown as File;
        const author = formData.get("author") as string;
        const genre = formData.get("genre") as string;

        const validateBody = bookSchema.safeParse({
            ...body,
            image,
            author,
            genre,
        });
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

        if (!image || image.name === "undefined") {
            return getErrorResponse("Image not found", 400);
        }
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let bookImage: string;

        if (process.env.NODE_ENV === "development") {
            const uploadDIR = `${process.cwd()}/public/uploads/books`;

            bookImage = await devUpload(uploadDIR, image.name, buffer);
        } else {
            const upload = await prodUpload(buffer, image.type, "books", {
                transformation: { width: 60, height: 60, crop: "thumb" },
            });

            if (!upload) {
                return getErrorResponse("Error uploading image", 400);
            }
            bookImage = (upload as { secure_url: string })?.secure_url;
        }

        await prisma.book.create({
            data: {
                image: bookImage,
                seller: {
                    connect: {
                        id: sellerId,
                    },
                },
                author: {
                    connectOrCreate: {
                        where: { name: author },
                        create: { name: author },
                    },
                },
                genre: {
                    connectOrCreate: {
                        where: { title: genre },
                        create: { title: genre },
                    },
                },
                ...body,
            },
        });

        return getSuccessResponse("Book added successfully", 201)
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse("Server Error");
    }
};

export const deleteBook = async (id: string) => {
    try {
        const book = await prisma.book.delete({
            where: {
                id,
            },
        });

        if (!book) {
            return getErrorResponse("Could not remove project.", 400);
        }

        revalidatePath("/admin/books");
        revalidatePath("/books");

        return getSuccessResponse("Book removed!", 204);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return getErrorResponse(error.message);
            }
        }

        return getErrorResponse("Server Error");
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateBook = async (prevState: unknown, formData: FormData) => {
    try {

        const id = formData.get("id") as string;

        const body: Partial<Book & { author?: never, genre?: never }> = {};

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const publishedDate = formData.get("publishedDate") as string;
        const image = formData.get("image") as unknown as File;
        const author = formData.get("author") as string;
        const genre = formData.get("genre") as string;
        const price = Number(formData.get("price") as string);
        const quantity = Number(formData.get("quantity") as string);


        const validateBody = updateBookSchema.safeParse({ name, description, publishedDate, author, genre, image });
        if (!validateBody.success) {
            return getErrorResponse("Validation Error", 400, undefined,
                Object.entries(validateBody.error.flatten().fieldErrors).map(
                    ([key, errorValue]) => ({ [key]: errorValue[0] })
                )[0])
        };


        if (name) {
            body.name = name;
        }

        if (price) {
            body.price = new Decimal(price);
        }

        if (quantity) {
            body.quantity = quantity;
        }

        if (description) {
            body.description = description;
        }
        if (publishedDate) {
            body.publishedDate = publishedDate;
        }
        if (author) {
            body.author = {
                connectOrCreate: {
                    where: { name: author },
                    create: { name: author },
                },
            } as never;
        }
        if (genre) {
            body.genre = {
                connectOrCreate: {
                    where: { title: genre },
                    create: { title: genre },
                },
            } as never;
        }

        if (image?.name !== "undefined") {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            if (process.env.NODE_ENV === "development") {
                const uploadDIR = `${process.cwd()}/public/uploads/books`;

                body.image = await devUpload(uploadDIR, image.name, buffer);
            } else {
                const upload = await prodUpload(buffer, image.type, "books", {
                    transformation: { width: 60, height: 60, crop: "thumb" },
                });

                if (!upload) {
                    return getErrorResponse("Error uploading image", 400);
                }
                body.image = (upload as { secure_url: string })?.secure_url;
            }
        }




        await prisma.book.update({
            where: { id },
            data: body,
        });

        revalidatePath("/admin/books");
        revalidatePath("/books");

        return getSuccessResponse("Book updated!", 204);
    } catch (error) {
        console.log(error, 'update error');
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse("Server Error");
    }
};

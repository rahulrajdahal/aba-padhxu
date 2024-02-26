'use server'

import { devUpload, prodUpload } from '@/utils/helpers';
import prisma from "@/utils/prisma";
import { routes } from '@/utils/routes';
import { Author } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { z } from 'zod';


const authorSchema = z.object({
    name: z.string().min(5, 'Min 5 Characters.'),
    // avatar: z.any().refine((file) => file?.size <= 5000000, `Max image size is 5MB.`).refine((file) => isValidFileType(file?.name), 'Not a valid image.'),
})

const updateAuthorSchema = z.object({
    name: z.string().min(5, 'Min 5 Characters.').optional(),
    // image: z.any().refine((file) => file?.size <= 5000000, `Max image size is 5MB.`).refine((file) => isValidFileType(file?.name), 'Not a valid image.').optional(),
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addAuthor = async (prevData: any, formData: FormData) => {
    try {
        const body = {
            name: formData.get('name') as string,
        };
        const avatar = formData.get('avatar') as unknown as File;
        const validateBody = authorSchema.safeParse({
            ...body,
            avatar,
        })
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }


        }

        if (!avatar || avatar.name === 'undefined') {
            throw new Error('Avatar not found');
        }
        const bytes = await avatar.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let avatarImage: string;

        if (process.env.NODE_ENV === 'development') {
            const uploadDIR = `${process.cwd()}/public/uploads/authors`;

            avatarImage = await devUpload(uploadDIR, avatar.name, buffer);
        } else {
            const upload = await prodUpload(buffer, avatar.type, 'authors', {
                transformation: { width: 60, height: 60, crop: 'thumb' },
            });

            if (!upload) {
                throw new Error('Error uploading avatar');
            }
            avatarImage = (upload as { secure_url: string })?.secure_url;
        }

        await prisma.author.create({
            data: {
                avatar: avatarImage,
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
    redirect(`${routes.dashboard}${routes.authors}`)

}

export const deleteAuthor = async (id: string) => {
    try {
        const author = await prisma.author.delete({
            where: { id },
        });

        if (!author) {
            throw new Error('Could not remove author.');
        }

        revalidatePath('/admin/authors');
        revalidatePath('/authors');
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
    redirect(`${routes.dashboard}${routes.authors}`)
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAuthor = async (id: string, formData: FormData) => {
    try {
        const body: Partial<Author> = {};

        const name = formData.get('name') as string;
        const avatar = formData.get('avatar') as unknown as File;

        const validateBody = updateAuthorSchema.safeParse({
            ...body,
            avatar,
        })
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }
        }

        if (name) { body.name = name }

        if (avatar?.name !== 'undefined') {
            const bytes = await avatar.arrayBuffer();
            const buffer = Buffer.from(bytes);


            if (process.env.NODE_ENV === 'development') {
                const uploadDIR = `${process.cwd()}/public/uploads/authors`;

                body.avatar = await devUpload(uploadDIR, avatar.name, buffer);
            } else {
                const upload = await prodUpload(buffer, avatar.type, 'authors', {
                    transformation: { width: 60, height: 60, crop: 'thumb' },
                });

                if (!upload) {
                    throw new Error('Error uploading avatar');
                }
                body.avatar = (upload as { secure_url: string })?.secure_url;
            }
        }

        await prisma.author.update({
            where: { id },
            data:
                body

        })

        revalidatePath('/admin/authors')
        revalidatePath('/authors')
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(error.message);
            }
        }
        throw new Error('Server Error')
    }
    redirect(`${routes.dashboard}${routes.authors}`)

}
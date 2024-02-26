'use server'

import prisma from "@/utils/prisma";
import { routes } from '@/utils/routes';
import { Genre } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { z } from 'zod';


const genreSchema = z.object({
    title: z.string().min(3, 'Min 3 Characters.'),
})

const updateGenreSchema = z.object({
    title: z.string().min(3, 'Min 3 Characters.').optional(),
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addGenre = async (prevData: any, formData: FormData) => {
    try {
        const body = {
            title: formData.get('title') as string,
        };
        const validateBody = genreSchema.safeParse(body)
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }

        }
        await prisma.genre.create({ data: body })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(error.message);
            }
        }
        throw new Error('Server Error')
    }
    redirect(`${routes.dashboard}${routes.genres}`)

}

export const deleteGenre = async (id: string) => {
    try {
        const genre = await prisma.genre.delete({
            where: { id },
        });

        if (!genre) {
            throw new Error('Could not remove genre.');
        }

        revalidatePath('/admin/genres');
        revalidatePath('/genres');
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
    redirect(`${routes.dashboard}${routes.genres}`)
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateGenre = async (id: string, formData: FormData) => {
    try {
        const body: Partial<Genre> = {};

        const title = formData.get('title') as string;

        const validateBody = updateGenreSchema.safeParse(body)
        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }
        }

        if (title) { body.title = title }


        await prisma.genre.update({
            where: { id },
            data:
                body

        })

        revalidatePath('/admin/genres')
        revalidatePath('/genres')
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(error.message);
            }
        }
        throw new Error('Server Error')
    }
    redirect(`${routes.dashboard}${routes.genres}`)

}
"use server";

import prisma from "@/prisma/prisma";
import { getErrorResponse, getSuccessResponse } from "@/utils/helpers";
import { routes } from "@/utils/routes";
import { Genre } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const genreSchema = z.object({
    title: z.string().min(3, "Min 3 Characters."),
});

const updateGenreSchema = z.object({
    title: z.string().min(3, "Min 3 Characters.").optional(),
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
        await prisma.genre.create({ data: body });
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

export const updateGenre = async (prevState: unknown, formData: FormData) => {
    try {
        const id = formData.get("id") as string;

        const body: Partial<Genre> = {};

        const title = formData.get("title") as string;

        const validateBody = updateGenreSchema.safeParse(body);
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

        if (title) {
            body.title = title;
        }

        await prisma.genre.update({
            where: { id },
            data: body,
        });

        revalidatePath("/admin/genres");
        revalidatePath("/genres");

        return getSuccessResponse("Genre Updated Successfully", 204);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return getErrorResponse(error.message);
            }
        }
        return getErrorResponse("Server Error");
    }
};

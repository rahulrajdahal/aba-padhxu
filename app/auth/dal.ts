import 'server-only';

import prisma from "@/prisma/prisma";
import { decrypt } from "@/utils/auth";
import { cookies } from "next/headers";
import { cache } from "react";


export const verifySession = async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie)

    if (!session) {
        return { isAuth: false, userId: null }
    }

    return { isAuth: true, userId: session.userId }
}

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) {
        return null;
    }

    const user = await prisma.user.findUniqueOrThrow({
        where: { id: session.userId as string }
    });

    return user;
});
import { UserRoles } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

export const signJWT = async (
    payload: {
        sub: string;
        isSuperAdmin: boolean;
        role: UserRoles;
    },
    options: {
        exp: string;
    }
) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';
    return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(options.exp)
        .setIssuedAt()
        .setSubject(payload.sub)
        .sign(secret);
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
        return (
            await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            )
        ).payload as T;
    } catch (error) {
        throw new Error('Your token has expired.');
    }
};
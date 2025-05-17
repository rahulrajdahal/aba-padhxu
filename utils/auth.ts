import 'server-only';

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
export const expiresAt = parseInt(process.env.JWT_EXPIRES as string) * 60;
const alg = "HS256";

type EncryptPayload = {
  userId: string;
  expiresAt: number;
};

export const encrypt = async (payload: EncryptPayload) => {

  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
};

export const decrypt = async (token: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: [alg] })
    return payload
  } catch (error) {
    console.log("Failed to verify session", error)
  }
};

export const createSession = async (userId: string) => {
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    name: 'session',
    value: session,
    maxAge: expiresAt,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
};

export const updateSession = async () => {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }


  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};


export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};





import { decryptJWT, encryptJWT, expiresAt } from "@/utils/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { getUserByEmail, getUserById } from "../users/users.service";

const cookieStore = await cookies();

export const createSession = async (userId: string) => {
  const session = await encryptJWT({ userId });

  cookieStore.set("session", session, {
    name: "session",
    value: session,
    maxAge: expiresAt,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const sessionCookie = () => cookieStore.get("session")?.value;

export const verifySession = async () => {
  const cookie = sessionCookie();
  const session = await decryptJWT(cookie);

  if (!session) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: session.userId };
};

export const updateSession = async () => {
  const session = sessionCookie();
  const payload = await decryptJWT(session);

  if (!session || !payload) {
    return null;
  }

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = () => cookieStore.delete("session");

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const userEmailExists = async (email: string) => {
  return !!(await getUserByEmail(email));
};

export const isUserActive = async (email: string) => {
  return (await getUserByEmail(email))?.isActive;
};

export const isAuthenticated = async () => {
  const { isAuth } = await verifySession();
  return isAuth;
};
export const authUserId = async () => {
  const { userId } = await verifySession();
  return userId;
};

export const authUser = async () => {
  const userId = await authUserId();
  if (!userId) return null;

  return await getUserById(userId as string);
};

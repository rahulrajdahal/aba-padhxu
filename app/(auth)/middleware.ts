import "server-only";

import { ForbiddenError } from "@/lib/errors";
import { decryptJWT, encryptJWT, expiresAt } from "@/utils/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { userProfilesService } from "../dashboard/user_profiles/user_profiles.service";
import { usersService } from "../dashboard/users/users.service";

export const createSession = async (userId: string) => {
  const cookieStore = await cookies();
  const session = await encryptJWT({ userId });

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: expiresAt,
    sameSite: "strict",
    path: "/",
  });
};

export const sessionCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
};

export const verifySession = async () => {
  const cookie = await sessionCookie();
  const session = await decryptJWT(cookie);

  if (!session) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: session.userId };
};

export const updateSession = async () => {
  const cookieStore = await cookies();
  const session = await sessionCookie();
  const payload = await decryptJWT(session);

  if (!session || !payload) {
    return null;
  }

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: expiresAt,
    sameSite: "strict",
    path: "/",
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const userEmailExists = async (email: string) => {
  const user = await usersService.getUserByEmail(email);

  return !!user;
};

export const isUserActive = async (email: string) => {
  return (await usersService.getUserByEmail(email))?.isActive;
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
  if (!userId) {
    throw new ForbiddenError();
  }

  const user = await usersService.getUserById(userId as string);
  const userProfile = await userProfilesService.findUserProfileByUserId(
    user.id,
  );

  return { ...user, ...userProfile };
};

export const isAdmin = async () => {
  const user = await authUser();

  return user.isAdmin;
};

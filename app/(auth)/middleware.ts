import "server-only";

import EmailTemplate from "@/emails/EmailTemplate";
import { User } from "@/generated/prisma/client/client";
import {
  BadRequestError,
  ForbiddenError,
  UnAuthorizedError,
} from "@/lib/errors";
import { logger } from "@/lib/logger";
import { errorResponse, okResponse, serverError } from "@/lib/responses";
import { decryptJWT, encryptJWT, expiresAt } from "@/utils/auth";
import { transporter } from "@/utils/nodemailer";
import { render } from "@react-email/components";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { generateToken } from "../dashboard/tokens/middleware";
import { createToken } from "../dashboard/tokens/tokens.service";
import { getUserByEmail, getUserById } from "../dashboard/users/users.service";

export const createSession = async (userId: string) => {
  const cookieStore = await cookies();
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
  const user = await getUserByEmail(email);
  if (user) {
    throw new BadRequestError("User with this email already exists");
  }
  return !!user;
};

export const isUserActive = async (email: string) => {
  return (await getUserByEmail(email))?.isActive;
};

export const isAuthenticated = async () => {
  const { isAuth } = await verifySession();
  if (!isAuth) {
    throw new UnAuthorizedError();
  }

  return isAuth;
};
export const authUserId = async () => {
  const { userId } = await verifySession();
  if (!userId) {
    throw new ForbiddenError();
  }
  return userId;
};

export const authUser = async () => {
  const userId = await authUserId();
  if (!userId) {
    throw new ForbiddenError();
  }

  return await getUserById(userId as string);
};

export const sendEmail = async (
  subject: string,
  to: string,
  emailHTML: string,
) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html: emailHTML,
    };

    await new Promise((resolve, reject) =>
      transporter.sendMail(mailOptions, function (error: unknown) {
        if (error) {
          reject(new Error("Error sending mail."));
        } else {
          resolve(true);
        }
      }),
    );
  } catch (error) {
    logger.error("Error sending mail", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong.");
  }
};

export const sendConfirmationEmail = async (
  user: Pick<User, "email" | "id">,
  message = "An confirmation email was just sent!",
) => {
  try {
    const emailToken = generateToken();

    await createToken({
      token: emailToken,
      type: "EMAIL_CONFIRMATION",
      userId: user.id,
    });

    const emailHtml = await render(
      EmailTemplate({
        title: "Sign up with Aba Padhxu",
        heading: "Email Confirmation",
        body: `Follow the provided link to activate your account. http://localhost:3000/confirm-email/${emailToken}`,
      }),
    );

    await sendEmail("Confirmation Email", user.email, emailHtml);

    return okResponse(message);
  } catch (error) {
    logger.error("Error sending mail", error);
    if (error instanceof Error) {
      return errorResponse(error.message);
    }
    return serverError();
  }
};

export const sendResetPasswordEmail = async (
  user: Pick<User, "email" | "id">,
) => {
  try {
    const resetToken = generateToken();
    await createToken({
      token: resetToken,
      type: "PASSWORD_RESET",
      userId: user.id,
    });

    const emailHtml = await render(
      EmailTemplate({
        title: "Password reset request",
        heading: "Reset Password",
        body: `Follow the provided link to reset your account password. http://localhost:3000/auth/reset-password/${resetToken}`,
      }),
    );

    await sendEmail("Reset Password in Aba Padhxu", user.email, emailHtml);

    return okResponse("A reset password link has been sent to your email.");
  } catch (error) {
    logger.error("Error sending mail", error);
    if (error instanceof Error) {
      return errorResponse(error.message);
    }
    return serverError();
  }
};

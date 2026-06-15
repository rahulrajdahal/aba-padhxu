import EmailTemplate from "@/emails/EmailTemplate";
import { User } from "@/generated/prisma/client/client";
import { TokenType } from "@/generated/prisma/client/enums";
import { logger } from "@/lib/logger";
import {
  errorResponse,
  invalidRequestError,
  noContentResponse,
  okResponse,
  serverError,
} from "@/lib/responses";
import { decryptJWT, encryptJWT, expiresAt } from "@/utils/auth";
import { transporter } from "@/utils/nodemailer";
import { render } from "@react-email/components";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { generateToken } from "../tokens/middleware";
import {
  createToken,
  deleteTokenById,
  getTokenByToken,
} from "../tokens/tokens.service";
import {
  getUserByEmail,
  getUserById,
  patchUserById,
} from "../users/users.service";

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
        body: `Follow the provided link to activate your account. http://localhost:3000/auth/confirm-email/${emailToken}`,
      }),
    );

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Sign up with Aba Padhxu",
      html: emailHtml,
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

    return okResponse(message);
  } catch (error) {
    logger.error("Error sending mail", error);
    if (error instanceof Error) {
      return errorResponse(error.message);
    }
    return serverError();
  }
};

export const confirmEmail = async (emailToken: string) => {
  try {
    const token = await getTokenByToken(emailToken);

    if (!token || token.type !== TokenType.EMAIL_CONFIRMATION) {
      return invalidRequestError();
    }

    await patchUserById(token.userId, { isActive: true });

    await deleteTokenById(token.id);

    return noContentResponse();
  } catch (error) {
    logger.error("Error confirming email", error);
    return serverError();
  }
};

"use server";

import EmailTemplate from "@/emails/EmailTemplate";
import { UserRoles } from "@/generated/prisma/client/client";
import { logger } from "@/lib/logger";
import {
  errorResponse,
  invalidRequestError,
  okResponse,
  serverError,
  validationError,
} from "@/lib/responses";
import { prisma } from "@/prisma/prisma";
import { createSession, deleteSession, encrypt, expiresAt } from "@/utils/auth";
import { getErrorResponse, getSuccessResponse } from "@/utils/helpers";
import { transporter } from "@/utils/nodemailer";
import { routes } from "@/utils/routes";
import { render } from "@react-email/components";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findByEmail } from "../users/users.dal";
import { createUser, getUserByEmail } from "../users/users.service";
import { loginSchema, signupSchema } from "./auth.validation";
import { verifySession } from "./dal";
import { getUserId, getUserRole } from "./dto";
import {
  comparePassword,
  hashPassword,
  isUserActive,
  sendConfirmationEmail,
  userEmailExists,
} from "./middleware";

export async function signup(prevState: unknown, formData: FormData) {
  try {
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validateBody = signupSchema.safeParse({
      ...body,
      confirmPassword: formData.get("confirmPassword") as string,
    });
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    if (await userEmailExists(body.email)) {
      if (!(await isUserActive(body.email))) {
        const existingUser = await getUserByEmail(body.email);

        return await sendConfirmationEmail(existingUser);
      }
    }

    const passwordHash = await hashPassword(body.password);

    const userId = await createUser({ ...body, passwordHash });

    if (!userId) {
      return errorResponse("Error registering user");
    }

    return await sendConfirmationEmail({ email: body.email, id: userId });
  } catch (error) {
    logger.error("Error registering user", error);
    return serverError();
  }
}

export const login = async (prevState: unknown, formData: FormData) => {
  try {
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validateBody = loginSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const user = await findByEmail(body.email);
    if (!user || !(await comparePassword(body.password, user.passwordHash))) {
      return invalidRequestError("Invalid Credentials");
    }

    if (!user.isActive) {
      return await sendConfirmationEmail(
        user,
        "User email not confirmed. Please check your email for confirmation link.",
      );
    }

    await createSession(user.id);

    return okResponse("Login successful.");
  } catch (error) {
    logger.error("Error logging in", error);
    return serverError();
  }
};

export const forgotPassword = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const body = {
      email: formData.get("email") as string,
    };

    const validatedFields = forgotPasswordSchema.safeParse(body);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return getErrorResponse(
        "Validation Error",
        undefined,
        validatedFields.error.flatten().fieldErrors,
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return getErrorResponse("Email not registered.", 400);
    }

    const hashToken = await encrypt({ userId: user.id, expiresAt });

    const tokenBody = { token: hashToken, email: user.email };

    await prisma.token.create({ data: tokenBody });

    const emailHtml = await render(
      EmailTemplate({
        title: "Password reset request",
        heading: "Reset Password",
        body: `Follow the provided link to reset your account password. http://localhost:3000/auth/reset-password/${hashToken}`,
      }),
    );

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Reset Password in Aba Padhxu",
      html: emailHtml,
    };

    await new Promise((resolve, reject) =>
      transporter.sendMail(mailOptions, function (error: any) {
        if (error) {
          reject(new Error("Error sending mail"));
        } else {
          resolve(true);
        }
      }),
    );

    return getSuccessResponse(
      "A reset password link has been sent to your email.",
    );
  } catch (error) {
    return getErrorResponse("Server Error", 500, error);
  }
};

export const resetPassword = async (prevState: unknown, formData: FormData) => {
  try {
    const body = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedFields = resetPasswordSchema.safeParse(body);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return getErrorResponse(
        "Validation Error",
        undefined,
        validatedFields.error.flatten().fieldErrors,
      );
    }

    const token = await prisma.token.findFirst({
      where: {
        token: formData.get("token") as string,
      },
    });

    if (!token) {
      return getErrorResponse("Invalid request.");
    }

    const user = await prisma.user.findFirst({ where: { email: token.email } });

    await prisma.token.delete({ where: { id: token.id } });

    if (!user) {
      return getErrorResponse("Invalid request.");
    }

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: body.password },
    });

    return getSuccessResponse("Password updated.");
  } catch (error) {
    return getErrorResponse("Server Error", 500, error);
  }
};

export const logout = async () => {
  await deleteSession();
  redirect(routes.login);
};

export const getNavbarProps = async () => {
  const { userId, isAuth } = await verifySession();

  const count = (await cookies())?.get("cartItems")?.value
    ? JSON.parse((await cookies())?.get("cartItems")?.value as string).length
    : 0;

  if (!isAuth) {
    return {
      role: UserRoles.USER,
      isLoggedIn: false,
      count,
      notifications: [],
    };
  }

  const role = await getUserRole();

  const notifications = await prisma.notification.findMany({
    where: {
      userId: userId as string,
    },
  });

  return { role, isLoggedIn: isAuth, count, notifications };
};

export const getUserInfo = async () => {
  const userId = await getUserId();

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return { name: "user", email: "user@email.com", avatar: "default.png" };
  }

  return { email: user.email, name: user.name, avatar: user.avatar };
};

"use server";

import { TokenType } from "@/generated/prisma/client/client";
import { logger } from "@/lib/logger";
import {
  errorResponse,
  invalidRequestError,
  noContentResponse,
  okResponse,
  serverError,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { findByEmail } from "../dashboard/users/users.dal";
import {
  createUser,
  getUserByEmail,
  getUserById,
  patchUserById,
} from "../dashboard/users/users.service";

import {
  deleteTokenById,
  getTokenByToken,
} from "../dashboard/tokens/tokens.service";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "./auth.validation";
import {
  comparePassword,
  createSession,
  deleteSession,
  hashPassword,
  isUserActive,
  sendConfirmationEmail,
  sendResetPasswordEmail,
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

export const forgotPassword = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const body = {
      email: formData.get("email") as string,
    };

    const validatedFields = forgotPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return validationError(validatedFields.error.flatten().fieldErrors);
    }

    const user = await getUserByEmail(body.email);

    if (!user) {
      return invalidRequestError("Email not registered.");
    }

    return sendResetPasswordEmail(user);
  } catch (error) {
    logger.error("Error sending reset password email", error);
    return serverError();
  }
};

export const resetPassword = async (prevState: unknown, formData: FormData) => {
  try {
    const body = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedFields = resetPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return validationError(validatedFields.error.flatten().fieldErrors);
    }

    const token = await getTokenByToken(formData.get("token") as string);

    if (!token || token.type !== TokenType.PASSWORD_RESET) {
      return invalidRequestError();
    }

    const user = await getUserById(token.userId);

    if (!user) {
      return invalidRequestError();
    }

    await deleteTokenById(token.id);

    const passwordHash = await hashPassword(body.password);

    await patchUserById(user.id, { passwordHash });

    return noContentResponse();
  } catch (error) {
    logger.error("Error resetting password", error);
    return serverError();
  }
};

export const logout = async () => {
  deleteSession();
  redirect(routes.login);
};

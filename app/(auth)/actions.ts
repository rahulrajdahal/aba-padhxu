"use server";

import { TokenType } from "@/generated/prisma/client/client";
import { logger } from "@/lib/logger";
import {
  actionWrapper,
  conflictError,
  errorResponse,
  invalidRequestError,
  noContentResponse,
  okResponse,
  serverError,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";

import { sendConfirmationEmail, sendResetPasswordEmail } from "@/lib/email";
import { BadRequestError } from "@/lib/errors";
import {
  deleteTokenById,
  getTokenByToken,
} from "../dashboard/tokens/tokens.service";
import { createUserProfile } from "../dashboard/user_profiles/user_profiles.service";
import { usersService } from "../dashboard/users/users.service";
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
  userEmailExists,
} from "./middleware";

export const signup = actionWrapper(async function (
  prevState: unknown,
  formData: FormData,
) {
  const body = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = signupSchema.safeParse({
    ...body,
    confirmPassword: formData.get("confirmPassword") as string,
  });
  if (!validatedFields.success) {
    return validationError(validatedFields.error.flatten().fieldErrors);
  }

  const existingUser = await userEmailExists(body.email);
  if (existingUser) {
    return conflictError("User with this email already exists");
  }

  const passwordHash = await hashPassword(body.password);

  const userId = await usersService.createUser({
    email: body.email,
    passwordHash,
  });
  if (!userId) {
    return errorResponse("Error registering user");
  }

  const userProfile = await createUserProfile({
    firstName: body.firstName,
    lastName: body.lastName,
    userId,
  });
  if (!userProfile) {
    return errorResponse("Error registering user profile");
  }

  return await sendConfirmationEmail({ email: body.email, id: userId });
});

export const login = actionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validateBody = loginSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const user = await usersService.getUserByEmail(body.email);
    if (!user || !(await comparePassword(body.password, user.passwordHash))) {
      throw new BadRequestError("Invalid Credentials");
    }

    if (!user.isActive) {
      return await sendConfirmationEmail(
        user,
        "User email not confirmed. Please check your email for confirmation link.",
      );
    }

    await createSession(user.id);

    return okResponse("Login successful.");
  },
);

export const confirmEmail = actionWrapper(async (emailToken: string) => {
  const token = await getTokenByToken(emailToken);

  if (!token || token.type !== TokenType.EMAIL_CONFIRMATION) {
    return invalidRequestError();
  }

  // Verify token expiration
  if (token.expiresAt < new Date()) {
    return errorResponse("Token has expired", 400);
  }

  await usersService.patchUserById(token.userId, { isActive: true });

  await deleteTokenById(token.id);

  return noContentResponse();
});

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

    const user = await usersService.getUserByEmail(body.email);

    if (!user) {
      return okResponse(
        "If that email is registered, a reset link has been sent.",
      );
    }

    return sendResetPasswordEmail(user.email);
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

    // Verify token expiration
    if (token.expiresAt < new Date()) {
      return errorResponse("Token has expired", 400);
    }

    const user = await usersService.getUserById(token.userId);

    if (!user) {
      return invalidRequestError();
    }

    await deleteTokenById(token.id);

    const passwordHash = await hashPassword(body.password);

    await usersService.patchUserById(user.id, { passwordHash });

    return noContentResponse();
  } catch (error) {
    logger.error("Error resetting password", error);
    return serverError();
  }
};

export const logout = async () => {
  await deleteSession();
  redirect(routes.login);
};

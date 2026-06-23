"use server";

import {
  authUserId,
  comparePassword,
  hashPassword,
  sendResetPasswordEmail,
} from "@/app/(auth)/middleware";
import {
  authActionWrapper,
  invalidRequestError,
  validationError,
} from "@/lib/responses";
import {
  getUserByIdWithPassword,
  patchUserById,
} from "../../users/users.service";
import { updatePasswordSchema } from "./password.validation";

export const updatePassword = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();

    const body = {
      oldPassword: formData.get("oldPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validateBody = updatePasswordSchema.safeParse(body);

    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }
    const user = await getUserByIdWithPassword(userId as string);
    if (!user) {
      return invalidRequestError();
    }

    const isPasswordValid = await comparePassword(
      body.oldPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return invalidRequestError();
    }

    const passwordHash = await hashPassword(body.newPassword);
    await patchUserById(userId as string, { passwordHash });

    return sendResetPasswordEmail(user.email);
  },
);

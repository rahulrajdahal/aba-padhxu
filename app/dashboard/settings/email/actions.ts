"use server";

import { authUserId } from "@/app/(auth)/middleware";
import {
  authActionWrapper,
  invalidRequestError,
  noContentResponse,
  okResponse,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { getUserById, patchUserById } from "../../users/users.service";
import { updateEmailAddressSchema } from "./emailAddress.validation";

export const fetchUserEmail = authActionWrapper(async () => {
  const userId = await authUserId();

  const user = await getUserById(userId as string);

  if (!user) {
    return invalidRequestError();
  }

  return okResponse("Fetched user email", user.email);
});

export const updateEmailAddress = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();

    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validateBody = updateEmailAddressSchema.safeParse(body);

    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await patchUserById(userId as string, { email: body.email });

    revalidatePath(`${routes.dashboard}${routes.emailSettings}`);
    return noContentResponse();
  },
);

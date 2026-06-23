"use server";

import { authUserId, isAuthenticated } from "@/app/(auth)/middleware";
import { fileUpload, removeUploadFile } from "@/lib/fileUpload";
import { logger } from "@/lib/logger";
import {
  authActionWrapper,
  forbiddenError,
  noContentResponse,
  notFoundError,
  okResponse,
  serverError,
  unauthorizedError,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { PatchUserProfileDTO } from "./user_profiles.dto";
import {
  findUserProfileByUserId,
  patchUserProfileByUserId,
} from "./user_profiles.service";
import { updateUserProfileSchema } from "./user_profiles.validation";

export const fetchUserProfile = async () => {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return unauthorizedError();
    }
    const userId = await authUserId();
    if (!userId) {
      return unauthorizedError();
    }

    const profile = await findUserProfileByUserId(userId as string);
    return okResponse("Profile fetched successfully", profile);
  } catch (error) {
    logger.error("Error adding user profile", error);
    return serverError();
  }
};

export const updateUserProfile = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const existingUserProfile = await findUserProfileByUserId(userId as string);

    if (!existingUserProfile) {
      return notFoundError("User profile");
    }

    const body: PatchUserProfileDTO = {};

    const firstName = formData.get("firstName") as string;
    if (firstName) body.firstName = firstName;

    const lastName = formData.get("lastName") as string;
    if (lastName) body.lastName = lastName;

    const phoneNumber = formData.get("mobile") as string;
    if (phoneNumber) body.phoneNumber = phoneNumber;

    const avatar = formData.get("avatar") as File;
    if (avatar) {
      if (existingUserProfile.avatar !== "default.avif") {
        await removeUploadFile(existingUserProfile.avatar!, "users");
      }
      body.avatar = (await fileUpload(avatar, "users", {})) as string;
    }

    const validateBody = updateUserProfileSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await patchUserProfileByUserId(userId as string, body);
    revalidatePath(routes.dashboard);
    revalidatePath(`${routes.dashboard}${routes.generalSettings}`);
    return noContentResponse();
  },
);

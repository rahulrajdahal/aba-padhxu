import { authUserId, isAuthenticated } from "@/app/(auth)/middleware";
import { fileUpload, removeUploadFile } from "@/lib/fileUpload";
import { logger } from "@/lib/logger";
import {
  createdResponse,
  noContentResponse,
  okResponse,
  serverError,
  unauthorizedError,
  validationError,
} from "@/lib/responses";
import { PatchUserProfileDTO } from "./user_profiles.dto";
import {
  createUserProfile,
  findUserProfileByUserId,
  patchUserProfileByUserId,
} from "./user_profiles.service";
import { addUserProfileSchema } from "./user_profiles.validation";

export const addUserProfile = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const body = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phoneNumber: formData.get("mobile") as string,
      avatar: formData.get("profileImage") as string,
    };

    const validateBody = addUserProfileSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const profileId = await createUserProfile(body);
    return createdResponse("Profile created successfully", profileId);
  } catch (error) {
    logger.error("Error adding user profile", error);
    return serverError();
  }
};

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

export const updateUserProfile = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return unauthorizedError();
    }
    const userId = await authUserId();
    if (!userId) {
      return unauthorizedError();
    }

    const body: PatchUserProfileDTO = {};

    const firstName = formData.get("firstName") as string;
    if (firstName) body.firstName = firstName;

    const lastName = formData.get("lastName") as string;
    if (lastName) body.lastName = lastName;

    const phoneNumber = formData.get("mobile") as string;
    if (phoneNumber) body.phoneNumber = phoneNumber;

    const avatar = formData.get("profileImage") as File;
    if (avatar) {
      await removeUploadFile(avatar.name, "users");
      body.avatar = await fileUpload(avatar, "users", {});
    }

    const validateBody = addUserProfileSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await patchUserProfileByUserId(userId as string, body);
    return noContentResponse();
  } catch (error) {
    logger.error("Error updating user profile", error);
    return serverError();
  }
};

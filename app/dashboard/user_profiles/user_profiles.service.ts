import { UserProfile } from "@/generated/prisma/client/client";
import { create, findByUserId, updateByUserId } from "./user_profiles.dal";
import {
  CreateUserProfileDTO,
  mapUserProfileDTO,
  PatchUserProfileDTO,
} from "./user_profiles.dto";

export const createUserProfile = async (data: CreateUserProfileDTO) => {
  const userProfile = await create(data);
  return userProfile.userId;
};

export const findUserProfileByUserId = async (userId: string) => {
  const userProfile = await findByUserId(userId);
  return mapUserProfileDTO(userProfile as UserProfile);
};

export const patchUserProfileByUserId = async (
  userId: string,
  data: PatchUserProfileDTO,
) => {
  const user = await updateByUserId(userId, data);
  return mapUserProfileDTO(user as UserProfile);
};

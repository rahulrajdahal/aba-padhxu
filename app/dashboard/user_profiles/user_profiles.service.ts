import { UserProfile } from "@/generated/prisma/client/client";
import { userProfilesDal } from "./user_profiles.dal";
import {
  CreateUserProfileDTO,
  mapUserProfileDTO,
  PatchUserProfileDTO,
} from "./user_profiles.dto";

export const userProfilesService = {
  createUserProfile: async (data: CreateUserProfileDTO) => {
    const userProfile = await userProfilesDal.create(data);
    return userProfile.userId;
  },

  findUserProfileByUserId: async (userId: string) => {
    const userProfile = await userProfilesDal.findByUserId(userId);
    return mapUserProfileDTO(userProfile as UserProfile);
  },

  patchUserProfileByUserId: async (
    userId: string,
    data: PatchUserProfileDTO,
  ) => {
    const user = await userProfilesDal.updateByUserId(userId, data);
    return mapUserProfileDTO(user as UserProfile);
  },
};

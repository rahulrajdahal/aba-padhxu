import "server-only";

import { findUserProfileByUserId } from "./user_profiles.service";

export const userProfileExists = (userId: string) => {
  const user = findUserProfileByUserId(userId);
  return !!user;
};

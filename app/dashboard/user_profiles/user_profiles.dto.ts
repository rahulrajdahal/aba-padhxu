import { UserProfile } from "@/generated/prisma/client/client";

export type CreateUserProfileDTO = Omit<
  UserProfile,
  "id" | "userId" | "createdAt" | "updatedAt" | "sellerRating"
>;

export type PatchUserProfileDTO = Partial<CreateUserProfileDTO>;

export const mapUserProfileDTO = (user: UserProfile) => {
  const { updatedAt, ...rest } = user;
  return rest;
};

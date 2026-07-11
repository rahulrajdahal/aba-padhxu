import { UserProfile } from "@/generated/prisma/client/client";

export interface CreateUserProfileDTO extends Omit<
  UserProfile,
  | "createdAt"
  | "updatedAt"
  | "avatar"
  | "phoneNumber"
  | "isSeller"
  | "sellerRating"
  | "pendingEscrowFunds"
  | "availableFunds"
> {
  avatar?: string;
  phoneNumber?: string;
  isSeller?: boolean;
  sellerRating?: number;
  pendingEscrowFunds?: number;
  availableFunds?: number;
}

export type PatchUserProfileDTO = Partial<CreateUserProfileDTO>;

export const mapUserProfileDTO = (user: UserProfile) => {
  return user;
};

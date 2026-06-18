import { prisma } from "@/prisma/prisma";
import { CreateUserProfileDTO, PatchUserProfileDTO } from "./user_profiles.dto";

export const create = async (data: CreateUserProfileDTO) =>
  await prisma.userProfile.create({
    data: {
      ...data,
      avatar: data?.avatar ?? "default.png",
      phoneNumber: data?.phoneNumber ?? "",
      isSeller: data?.isSeller ?? false,
      sellerRating: data?.sellerRating ?? 0,
      pendingEscrowFunds: data?.pendingEscrowFunds ?? 0,
      availableFunds: data?.availableFunds ?? 0,
    },
  });

export const findByUserId = async (userId: string) => {
  return await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });
};

export const updateByUserId = async (
  userId: string,
  data: PatchUserProfileDTO,
) =>
  await prisma.userProfile.update({
    where: {
      userId,
    },
    data,
  });

export const removeByUserId = async (userId: string) =>
  await prisma.userProfile.delete({
    where: {
      userId,
    },
  });

import { UserAddress } from "@/generated/prisma/client/client";

export type CreateUserAddressDTO = Omit<
  UserAddress,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type PatchUserAddressDTO = Partial<CreateUserAddressDTO>;

export const mapUserAddressDTO = (userAddress: UserAddress) => {
  const { createdAt, updatedAt, ...rest } = userAddress;
  return rest;
};

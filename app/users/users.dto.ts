import { User } from "@/generated/prisma/client/client";

export type CreateUserDTO = Pick<User, "email" | "passwordHash" | "isActive">;

export type PatchUserDTO = Partial<CreateUserDTO>;

export const mapUserDTO = (user: User) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

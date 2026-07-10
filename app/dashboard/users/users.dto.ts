import "server-only";

import { User } from "@/generated/prisma/client/client";

export type CreateUserDTO = Pick<User, "email" | "passwordHash">;
export type PatchUserDTO = Partial<CreateUserDTO> & { isActive?: boolean };

export const mapUserDTO = (user: User) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

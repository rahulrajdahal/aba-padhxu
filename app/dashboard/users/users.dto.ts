import "server-only";

import { User } from "@/generated/prisma/client/client";
import z from "zod";
import { addUserSchema } from "./users.validation";

export type CreateUserDTO = Pick<User, "email" | "passwordHash" | "isAdmin">;
export type PatchUserDTO = Partial<CreateUserDTO> & { isActive?: boolean };

export type CreateUserWithProfileDTO = Omit<
  z.infer<typeof addUserSchema>,
  "confirmPassword"
>;
export type UpdateUserWithProfileDTO = Partial<CreateUserWithProfileDTO>;

export const mapUserDTO = (user: User) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

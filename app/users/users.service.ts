import { User } from "@/generated/prisma/client/client";
import { findByEmail, findById } from "./users.dal";
import { mapUserDTO } from "./users.dto";

export const getUserById = async (id: string) => {
  const user = await findById(id);
  return mapUserDTO(user as User);
};

export const getUserByEmail = async (email: string) => {
  const user = await findByEmail(email);
  return mapUserDTO(user as User);
};

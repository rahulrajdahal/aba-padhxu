import { User } from "@/generated/prisma/client/client";
import { create, findByEmail, findById, updateById } from "./users.dal";
import { CreateUserDTO, mapUserDTO, PatchUserDTO } from "./users.dto";

export const createUser = async (data: CreateUserDTO) => {
  const user = await create({ ...data });
  return user.id;
};

export const getUserById = async (id: string) => {
  const user = await findById(id);
  return mapUserDTO(user as User);
};

export const getUserByIdWithPassword = async (id: string) => {
  const user = await findById(id);
  return user;
};

export const getUserByEmail = async (email: string) => {
  return await findByEmail(email);
};

export const patchUserById = async (id: string, data: PatchUserDTO) =>
  await updateById(id, data);

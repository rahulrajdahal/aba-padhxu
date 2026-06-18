import { UserAddress } from "@/generated/prisma/client/client";
import { create, findById, removeById, updateById } from "./user_addresses.dal";
import {
  CreateUserAddressDTO,
  mapUserAddressDTO,
  PatchUserAddressDTO,
} from "./user_addresses.dto";

export const createUserAddress = async (data: CreateUserAddressDTO) => {
  const userAddress = await create(data);
  return mapUserAddressDTO(userAddress);
};

export const findUserAddressById = async (id: string) => {
  const userAddress = await findById(id);
  return mapUserAddressDTO(userAddress as UserAddress);
};

export const putUserAddressById = async (
  id: string,
  data: CreateUserAddressDTO,
) => await updateById(id, data);

export const patchUserAddressById = async (
  id: string,
  data: PatchUserAddressDTO,
) => await updateById(id, data);

export const removeUserAddressById = async (id: string) => await removeById(id);

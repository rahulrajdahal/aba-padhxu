import { UserAddress } from "@/generated/prisma/client/client";
import { userAddressDals } from "./user_addresses.dal";
import {
  CreateUserAddressDTO,
  mapUserAddressDTO,
  PatchUserAddressDTO,
} from "./user_addresses.dto";

export const userAddressServices = {
  createUserAddress: async (data: CreateUserAddressDTO) => {
    const userAddress = await userAddressDals.create(data);
    return mapUserAddressDTO(userAddress);
  },

  findUserAddressById: async (id: string) => {
    const userAddress = await userAddressDals.findById(id);
    return mapUserAddressDTO(userAddress as UserAddress);
  },

  findUserAddressesByUserId: async (userId: string) => {
    const userAddresses = await userAddressDals.findAllByUserId(userId);
    return userAddresses.map(mapUserAddressDTO);
  },

  putUserAddressById: async (id: string, data: CreateUserAddressDTO) =>
    await userAddressDals.updateById(id, data),

  patchUserAddressById: async (id: string, data: PatchUserAddressDTO) =>
    await userAddressDals.updateById(id, data),

  removeUserAddressById: async (id: string) =>
    await userAddressDals.removeById(id),
};

"use server";

import { authUserId } from "@/app/(auth)/middleware";

import { AddressType } from "@/generated/prisma/client/enums";
import {
  authActionWrapper,
  createdResponse,
  forbiddenError,
  noContentResponse,
  okResponse,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { PatchUserAddressDTO } from "./user_addresses.dto";

import { userAddressServices } from "./user_addresses.service";
import {
  addUserAddressSchema,
  updateUserAddressSchema,
} from "./user_addresses.validation";

export const addUserAddress = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();
    if (!userId) {
      return forbiddenError();
    }

    const body = {
      type: formData.get("type") as AddressType,
      recipientName: formData.get("recipientName") as string,
      addressLine1: formData.get("addressLine1") as string,
      addressLine2: formData.get("addressLine2") as string,
      city: formData.get("city") as string,
      stateProvince: formData.get("stateProvince") as string,
      postalCode: formData.get("postalCode") as string,
      countryCode: formData.get("countryCode") as string,
      isDefault: Boolean(formData.get("isDefault") ?? false),
      userId: userId as string,
    };

    const validateBody = addUserAddressSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const addressId = await userAddressServices.createUserAddress(body);
    revalidatePath(`${routes.dashboard}${routes.addressSettings}`);
    return createdResponse("Address added successfully", addressId);
  },
);

export const fetchUserAddresses = authActionWrapper(async () => {
  const userId = await authUserId();
  if (!userId) {
    return forbiddenError();
  }

  const addresses = await userAddressServices.findUserAddressesByUserId(
    userId as string,
  );
  return okResponse("Addresses fetched successfully", addresses);
});

export const updateUserAddress = authActionWrapper(
  async (id: string, formData: FormData) => {
    const body: PatchUserAddressDTO = {};

    const recipientName = formData.get("recipientName") as string;
    if (recipientName) body.recipientName = recipientName;

    const addressLine1 = formData.get("addressLine1") as string;
    if (addressLine1) body.addressLine1 = addressLine1;

    const addressLine2 = formData.get("addressLine2") as string;
    if (addressLine2) body.addressLine2 = addressLine2;

    const city = formData.get("city") as string;
    if (city) body.city = city;

    const stateProvince = formData.get("stateProvince") as string;
    if (stateProvince) body.stateProvince = stateProvince;

    const postalCode = formData.get("postalCode") as string;
    if (postalCode) body.postalCode = postalCode;

    const countryCode = formData.get("countryCode") as string;
    if (countryCode) body.countryCode = countryCode;

    const isDefault = Boolean(formData.get("isDefault") ?? false);
    if (isDefault) {
      body.isDefault = isDefault;
    } else {
      body.isDefault = false;
    }

    const validateBody = updateUserAddressSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    await userAddressServices.patchUserAddressById(id, body);
    revalidatePath(`${routes.dashboard}${routes.addressSettings}`);
    return noContentResponse();
  },
);

export const deleteUserAddressById = authActionWrapper(async (id: string) => {
  await userAddressServices.removeUserAddressById(id);
  revalidatePath(`${routes.dashboard}${routes.addressSettings}`);
  revalidatePath(routes.checkout);
  return noContentResponse();
});

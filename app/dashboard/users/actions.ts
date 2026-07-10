"use server";

import { hashPassword, userEmailExists } from "@/app/(auth)/middleware";
import {
  adminActionWrapper,
  conflictError,
  createdResponse,
  noContentResponse,
  notFoundError,
  okResponse,
  validationError,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { UpdateUserWithProfileDTO } from "./users.dto";
import { usersService } from "./users.service";
import { addUserSchema, updateUserSchema } from "./users.validation";

export const fetchAllUsersCount = adminActionWrapper(async (query?: string) => {
  const count = await usersService.count(query);

  return okResponse("Users count fetched", count);
});

export const fetchAllUsers = adminActionWrapper(
  async (limit: number, offset: number, query?: string) => {
    const users = await usersService.findAll(limit, offset, query);

    return okResponse("Users fetched", users);
  },
);

export const addUserWithProfile = adminActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      isSeller: Boolean(formData.get("isSeller") as string),
      isAdmin: Boolean(formData.get("isAdmin") as string),
    };

    const validatedFields = addUserSchema.safeParse({
      ...body,
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!validatedFields.success) {
      return validationError(validatedFields.error.flatten().fieldErrors);
    }

    if (await userEmailExists(validatedFields.data.email)) {
      return conflictError("User with this email already exists");
    }

    const passwordHash = await hashPassword(validatedFields.data.password);

    const userId = await usersService.createUserWithProfile({
      ...validatedFields.data,
      password: passwordHash,
    });

    revalidatePath(`${routes.dashboard}${routes.users}`);
    return createdResponse("User added successfully", userId);
  },
);

export const fetchUserWithProfileById = adminActionWrapper(
  async (id: string) => {
    const user = await usersService.findUserWithProfileById(id);

    if (!user) {
      return notFoundError("User");
    }

    return okResponse("User fetched successfully", user);
  },
);

export const updateUserWithProfileById = adminActionWrapper(
  async (id: string, formData: FormData) => {
    const body: UpdateUserWithProfileDTO = {};
    const email = formData.get("email") as string;
    if (email) body.email = email;

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password) {
      body.password = password;
    }

    const firstName = formData.get("firstName") as string;
    if (firstName) body.firstName = firstName;

    const lastName = formData.get("lastName") as string;
    if (lastName) body.lastName = lastName;

    const phoneNumber = formData.get("phoneNumber") as string;
    if (phoneNumber) body.phoneNumber = phoneNumber;

    const isSeller = Boolean(formData.get("isSeller") as string);
    if (isSeller) body.isSeller = isSeller;

    const isAdmin = Boolean(formData.get("isAdmin") as string);
    if (isAdmin) body.isAdmin = isAdmin;

    const validatedFields = updateUserSchema.safeParse({
      ...body,
      ...(password && confirmPassword && { confirmPassword }),
    });

    if (!validatedFields.success) {
      return validationError(validatedFields.error.flatten().fieldErrors);
    }

    await usersService.updateUserWithProfileById(id, validatedFields.data);

    revalidatePath(`${routes.dashboard}${routes.users}`);
    return noContentResponse();
  },
);

export const deleteUserWithProfileById = adminActionWrapper(
  async (id: string) => {
    await usersService.deleteUserWithProfileById(id);
    revalidatePath(`${routes.dashboard}${routes.users}`);
    return noContentResponse();
  },
);

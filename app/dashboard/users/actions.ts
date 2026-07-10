"use server";

import { adminActionWrapper, okResponse } from "@/lib/responses";
import { usersService } from "./users.service";

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

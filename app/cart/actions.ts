"use server";

import {
  authActionWrapper,
  createdResponse,
  forbiddenError,
  noContentResponse,
} from "@/lib/responses";
import { authUserId } from "../(auth)/middleware";
import { cartService } from "./cart.service";

export const addCart = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const cartId = await cartService.create(userId as string);

  return createdResponse("User cart created!", cartId);
});

export const deleteCart = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  await cartService.deleteById(userId as string);

  return noContentResponse();
});

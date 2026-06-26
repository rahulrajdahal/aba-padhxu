"use server";

import { authUserId } from "@/app/(auth)/middleware";
import { listingExists } from "@/app/dashboard/listings/listings.middleware";
import { ListingsService } from "@/app/dashboard/listings/listings.service";
import {
  authActionWrapper,
  createdResponse,
  forbiddenError,
  invalidRequestError,
  noContentResponse,
  okResponse,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { cartService } from "../cart.service";
import { cartItemsService } from "./cartItems.service";

export const addCartItem = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const listingId = formData.get("listingId") as string;

    const listing = await listingExists(listingId);

    if (!listing) {
      return invalidRequestError();
    }

    const cartId = await cartService.findOrCreateByUserId(userId as string);

    const cartItemId = await cartItemsService.create(cartId, listingId);
    await ListingsService.decrementQuantityById(listingId);

    revalidatePath(routes.home);
    revalidatePath(routes.cart);

    return createdResponse("Cart item added successfully", cartItemId);
  },
);

export const updateCartItem = authActionWrapper(
  async (id: string, formData: FormData) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const listingId = formData.get("listingId") as string;

    const listing = await listingExists(listingId);

    if (!listing) {
      return invalidRequestError();
    }

    if (formData.get("type") === "decrement") {
      await cartItemsService.decrementQuantityById(id);
    } else {
      await cartItemsService.incrementQuantityById(id);
    }

    revalidatePath(routes.home);
    revalidatePath(routes.cart);

    return noContentResponse();
  },
);

export const cartItemsCount = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const cart = await cartService.findByUserId(userId as string);

  if (!cart) {
    return invalidRequestError("Cart not found");
  }

  const cartItemsCount = await cartItemsService.count(cart.id);

  return okResponse("Cart count fetched successfully", cartItemsCount);
});

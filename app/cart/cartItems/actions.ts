"use server";

import { authUserId } from "@/app/(auth)/middleware";
import {
  isValidQuantity,
  listingExists,
} from "@/app/dashboard/listings/listings.middleware";
import { ListingsService } from "@/app/dashboard/listings/listings.service";
import {
  authActionWrapper,
  badRequestError,
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

export const fetchUserCartItems = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const cart = await cartService.findByUserId(userId as string);

  if (!cart) {
    return invalidRequestError();
  }

  const cartItems = await cartItemsService.findByCartIdWithListings(cart.id);

  return okResponse("User cart items fetched!", cartItems);
});

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

    const quantity = Number(formData.get("quantity"));

    if (!isValidQuantity(listingId, quantity)) {
      return badRequestError("Invalid quantity");
    }

    await cartItemsService.updateById(id, {
      quantity,
    });

    revalidatePath(routes.home);
    revalidatePath(routes.cart);

    return noContentResponse();
  },
);

export const updateCartItemQuantity = authActionWrapper(
  async (id: string, listingId: string, type: "increment" | "decrement") => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    if (type === "decrement") {
      await cartItemsService.decrementQuantityById(id);
      await ListingsService.incrementQuantityById(listingId);
    } else {
      await cartItemsService.incrementQuantityById(id);
      await ListingsService.decrementQuantityById(listingId);
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

export const deletecartItem = authActionWrapper(async (id: string) => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const cartItem = await cartItemsService.findById(id);

  if (!cartItem) {
    return invalidRequestError();
  }

  await ListingsService.updateById(cartItem.listingId, {
    quantity: cartItem.quantity,
  });

  await cartItemsService.deleteById(id);

  revalidatePath(routes.cart);
  return noContentResponse();
});

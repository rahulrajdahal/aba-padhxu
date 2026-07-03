"use server";

import { authUserId } from "@/app/(auth)/middleware";
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
import { wishlistsService } from "./wishlists.service";
import { addWishlistSchema } from "./wishlists.validation";

export const addWishlist = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const body = {
      bookId: formData.get("bookId") as string,
    };

    const validate = addWishlistSchema.safeParse(body);
    if (!validate.success) {
      return validationError(validate.error.flatten().fieldErrors);
    }

    const wishlistId = await wishlistsService.create({
      bookId: body.bookId,
      userId: userId as string,
    });

    revalidatePath(routes.home);
    return createdResponse("Wishlist added", wishlistId);
  },
);

export const fetchWishlists = authActionWrapper(async () => {
  const wishlists = await wishlistsService.findAll();

  return okResponse("Wishlists fetched!", wishlists);
});

export const fetchUserWishlists = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const wishlists = await wishlistsService.findAllByUserId(userId as string);

  return okResponse("Wishlists fetched!", wishlists);
});

export const fetchUserWishlistItemsCount = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const count = await wishlistsService.countByUserId(userId as string);

  return okResponse("Wishlist items count fetched!", count);
});

export const deleteWishlistByBookId = authActionWrapper(
  async (bookId: string) => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    await wishlistsService.deleteByUserIdBookId(userId as string, bookId);
    revalidatePath(routes.home);
    return noContentResponse();
  },
);

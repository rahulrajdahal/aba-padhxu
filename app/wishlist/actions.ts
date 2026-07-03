import "server-only";

import { authActionWrapper, forbiddenError, okResponse } from "@/lib/responses";
import { authUserId } from "../(auth)/middleware";
import { wishlistsService } from "../dashboard/wishlists/wishlists.service";

export const fetchUserWishlistWithBooks = authActionWrapper(async () => {
  const userId = await authUserId();

  if (!userId) {
    return forbiddenError();
  }

  const wishlists = await wishlistsService.findAllByUserIdWithBooks(
    userId as string,
  );

  return okResponse("Wishlists fetched!", wishlists);
});

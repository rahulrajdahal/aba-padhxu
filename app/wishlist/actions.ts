import "server-only";

import { authActionWrapper, forbiddenError, okResponse } from "@/lib/responses";
import { authUserId } from "../(auth)/middleware";
import { wishlistsService } from "../dashboard/wishlists/wishlists.service";

export const fetchUserWishlistWithBooksAndGenreName = authActionWrapper(
  async () => {
    const userId = await authUserId();

    if (!userId) {
      return forbiddenError();
    }

    const wishlists =
      await wishlistsService.findAllByUserIdWithBooksAndGenreName(
        userId as string,
      );

    return okResponse("Wishlists fetched!", wishlists);
  },
);

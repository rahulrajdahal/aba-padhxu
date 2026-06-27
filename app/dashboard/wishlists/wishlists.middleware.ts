import { authUserId } from "@/app/(auth)/middleware";
import { ForbiddenError, NotFoundError } from "@/lib/errors";
import { WishlistsService } from "./wishlists.service";

export const wishlistExists = async (listingId: string) => {
  try {
    const userId = await authUserId();

    if (!userId) {
      throw new ForbiddenError();
    }

    const wishlist = await WishlistsService.findByUserIdBookId(
      userId as string,
      listingId,
    );

    if (!wishlist) {
      throw new NotFoundError("Wishlist");
    }

    return wishlist;
  } catch (error) {
    return null;
  }
};

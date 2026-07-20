"use server";

import { BookCondition } from "@/generated/prisma/client/enums";
import {
  actionWrapper,
  authActionWrapper,
  badRequestError,
  invalidRequestError,
  noContentResponse,
  okResponse,
} from "@/lib/responses";
import { routes } from "@/utils/routes";
import { revalidatePath } from "next/cache";
import { authUserId } from "./(auth)/middleware";
import { cartService } from "./cart/cart.service";
import { addCartItem } from "./cart/cartItems/actions";
import { cartItemsService } from "./cart/cartItems/cartItems.service";
import { genresService } from "./dashboard/genres/genres.service";
import { listingExists } from "./dashboard/listings/listings.middleware";
import { ListingsService } from "./dashboard/listings/listings.service";

export const fetchAllListings = actionWrapper(async (query?: string) => {
  const listings = await ListingsService.findAllWithBooks(query);

  return okResponse("Listings fetched successfully", listings);
});

export const fetchAllListingsWithBookAndGenreName = actionWrapper(
  async (
    limit: number,
    offset: number,
    query?: string,
    genre?: string,
    condition?: BookCondition,
  ) => {
    const listings = await ListingsService.findAllWithBooksAndGenreName(
      limit,
      offset,
      query,
      genre,
      condition,
    );

    return okResponse("Listings fetched successfully", listings);
  },
);

export const fetchAllGenresWithBookCount = actionWrapper(
  async (limit: number, offset: number) => {
    const genres = await genresService.findAllWithBooksCount(limit, offset);

    return okResponse("Genres fetched successfully", genres);
  },
);

export const addToCart = authActionWrapper(async (listingId: string) => {
  const listing = await listingExists(listingId);
  if (!listing) {
    return invalidRequestError();
  }

  const userId = await authUserId();
  if (!userId) {
    return invalidRequestError();
  }

  const cart = await cartService.findByUserId(userId as string);

  if (cart) {
    const existingCartItem = await cartItemsService.findByCartIdAndListingId(
      cart.id,
      listingId,
    );

    if (existingCartItem) {
      if (listing.quantity > 0) {
        await cartItemsService.incrementQuantityById(existingCartItem.id);
        await ListingsService.decrementQuantityById(listingId);

        return noContentResponse();
      } else {
        return badRequestError("Book is out of Stock");
      }
    }
  }
  const formData = new FormData();
  formData.append("listingId", listingId);

  const cartItemResponse = await addCartItem(null, formData);

  revalidatePath(routes.home);
  revalidatePath(routes.cart);

  return cartItemResponse;
});

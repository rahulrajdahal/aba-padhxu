"use server";

import { authUserId } from "@/app/(auth)/middleware";
import { BookCondition } from "@/generated/prisma/client/enums";
import {
  actionWrapper,
  adminActionWrapper,
  authActionWrapper,
  createdResponse,
  forbiddenError,
  noContentResponse,
  okResponse,
  validationError,
} from "@/lib/responses";
import { PatchListingDTO } from "./listings.dto";
import { ListingsService } from "./listings.service";
import { addListingSchema, updateListingSchema } from "./listings.validation";

export const addListing = authActionWrapper(
  async (prevState: unknown, formData: FormData) => {
    const sellerId = await authUserId();

    if (!sellerId) {
      return forbiddenError();
    }

    const body = {
      bookId: formData.get("bookId") as string,
      condition: formData.get("condition") as BookCondition,
      priceCents: Number(formData.get("priceCents")),
      quantity: Number(formData.get("quantity")),
      description: formData.get("description") as string,
      isActive: Boolean(formData.get("isActive")),
    };

    const validate = addListingSchema.safeParse(body);
    if (!validate.success) {
      return validationError(validate.error.flatten().fieldErrors);
    }

    const listingId = await ListingsService.create({
      ...body,
      priceCents: body.priceCents * 100,
      sellerId: sellerId as string,
    });

    return createdResponse("Listing added", listingId);
  },
);

export const fetchAllListings = adminActionWrapper(
  async (
    limit: number,
    offset: number,
    query?: string,
    condition?: BookCondition,
  ) => {
    const listings = await ListingsService.findAll(
      limit,
      offset,
      query,
      condition,
    );

    return okResponse("Listings fetched!", listings);
  },
);

export const fetchAllListingsCount = adminActionWrapper(
  async (query?: string, condition?: BookCondition) => {
    const count = await ListingsService.countAll(query, condition);

    return okResponse("Listings fetched!", count);
  },
);

export const fetchListingById = authActionWrapper(async (id: string) => {
  const listing = await ListingsService.findById(id);

  return okResponse("Listing fetched!", listing);
});

export const fetchListingByIdWithBookAndSeller = actionWrapper(
  async (id: string) => {
    const listing = await ListingsService.findByIdWithBookAndSeller(id);

    return okResponse("Listing fetched!", listing);
  },
);

export const fetchSellerListings = authActionWrapper(
  async (
    limit: number,
    offset: number,
    query?: string,
    condition?: BookCondition,
  ) => {
    const sellerId = await authUserId();

    if (!sellerId) {
      return forbiddenError();
    }

    const listings = await ListingsService.findBySellerId(
      sellerId as string,
      limit,
      offset,
      query,
      condition,
    );

    return okResponse("Listing fetched!", listings);
  },
);

export const fetchSellerListingCount = authActionWrapper(
  async (query?: string, condition?: BookCondition) => {
    const sellerId = await authUserId();

    if (!sellerId) {
      return forbiddenError();
    }

    const count = await ListingsService.countBySellerId(
      sellerId as string,
      query,
      condition,
    );

    return okResponse("Listing count fetched!", count);
  },
);

export const updateListingById = authActionWrapper(
  async (id: string, formData: FormData) => {
    const body: PatchListingDTO = {};

    const bookId = formData.get("bookId") as string;
    if (bookId) body.bookId = bookId;

    const condition = formData.get("condition") as BookCondition;
    if (condition) body.condition = condition;

    const priceCents = Number(formData.get("priceCents"));

    const quantity = Number(formData.get("quantity"));
    if (quantity) body.quantity = quantity;

    const description = formData.get("description") as string;
    if (description) body.description = description;

    const isActive = Boolean(formData.get("isActive"));
    if (isActive) body.isActive = isActive;

    if (priceCents) {
      body.priceCents = priceCents * 100;
    }

    const validate = updateListingSchema.safeParse(body);
    if (!validate.success) {
      return validationError(validate.error.flatten().fieldErrors);
    }

    await ListingsService.updateById(id, body);

    return noContentResponse();
  },
);

export const deleteListingById = authActionWrapper(async (id: string) => {
  await ListingsService.deleteById(id);

  return noContentResponse();
});

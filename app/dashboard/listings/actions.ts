"use server";

import { authUserId } from "@/app/(auth)/middleware";
import { BookCondition } from "@/generated/prisma/client/enums";
import {
  authActionWrapper,
  createdResponse,
  forbiddenError,
  validationError,
} from "@/lib/responses";
import { ListingsService } from "./listings.service";
import { addListingSchema } from "./listings.validation";

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

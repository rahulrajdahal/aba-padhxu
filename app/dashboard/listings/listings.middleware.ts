import { NotFoundError } from "@/lib/errors";
import { ListingsService } from "./listings.service";

export const listingExists = async (listingId: string) => {
  try {
    const listing = await ListingsService.findById(listingId);

    if (!listing) {
      throw new NotFoundError("Listing");
    }

    return listing;
  } catch (error) {
    return null;
  }
};

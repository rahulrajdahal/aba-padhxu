import { ListingsService } from "./listings.service";

export const listingExists = async (listingId: string) => {
  const listing = await ListingsService.findById(listingId);

  if (!listing) {
    return false;
  }

  return true;
};

export const isValidQuantity = async (listingId: string, quantity: number) => {
  const listing = await ListingsService.findById(listingId);

  if (!listing) {
    return false;
  }

  return listing.quantity >= quantity;
};

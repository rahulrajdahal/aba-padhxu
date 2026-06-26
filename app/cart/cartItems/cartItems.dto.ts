import { CartItem, Listing } from "@/generated/prisma/client/client";

export const cartItemDto = {
  getCartItem: (cartItem: CartItem) => {
    return {
      id: cartItem.id,
      cartId: cartItem.cartId,
      listingId: cartItem.listingId,
      quantity: cartItem.quantity,
    };
  },

  getCartItems: (cartItems: CartItem[]) => {
    return cartItems.map((cartItem) => cartItemDto.getCartItem(cartItem));
  },

  getCartItemWithListing: (cartItem: CartItem & { listing: Listing }) => {
    return {
      id: cartItem.id,
      cartId: cartItem.cartId,
      listingId: cartItem.listingId,
      quantity: cartItem.quantity,
      listing: cartItem.listing,
    };
  },

  getCartItemsWithListings: (
    cartItems: (CartItem & { listing: Listing })[],
  ) => {
    return cartItems.map((cartItem) =>
      cartItemDto.getCartItemWithListing(cartItem),
    );
  },
};

import {
  Book,
  CartItem,
  Listing,
  UserAddress,
} from "@/generated/prisma/client/client";
import { cartItemsCount, fetchUserCartItems } from "../cart/cartItems/actions";
import { fetchUserAddresses } from "../dashboard/user_addresses/actions";
import { fetchUserWishlistItemsCount } from "../dashboard/wishlists/actions";
import CheckoutPage from "./Checkout";

export default async function page() {
  const [
    { data },
    { data: cartCount },
    { data: wishlistItemsCount },
    { data: addresses },
  ] = await Promise.all([
    fetchUserCartItems(),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
    fetchUserAddresses(),
  ]);

  return (
    <CheckoutPage
      cartItems={data as (CartItem & { listing: Listing & { book: Book } })[]}
      cartCount={Number(cartCount)}
      wishlistCount={Number(wishlistItemsCount)}
      shippingAddresses={addresses as UserAddress[]}
    />
  );
}

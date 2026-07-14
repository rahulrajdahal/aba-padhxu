import { PublicPageLayout } from "@/components/layouts";
import {
  AddressType,
  Book,
  CartItem,
  Listing,
  UserAddress,
} from "@/generated/prisma/client/client";
import { isAuthenticated } from "../(auth)/middleware";
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
    isAuth,
  ] = await Promise.all([
    fetchUserCartItems(),
    cartItemsCount(),
    fetchUserWishlistItemsCount(),
    fetchUserAddresses(AddressType.SHIPPING),
    isAuthenticated(),
  ]);

  return (
    <PublicPageLayout
      isAuth={isAuth}
      cartItemsCount={Number(cartCount)}
      wishlistItemsCount={Number(wishlistItemsCount)}
    >
      <CheckoutPage
        cartItems={data as (CartItem & { listing: Listing & { book: Book } })[]}
        shippingAddresses={addresses as UserAddress[]}
      />
    </PublicPageLayout>
  );
}
